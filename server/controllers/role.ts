import { Request, Response } from "express";
import pool from "../db/dbconnect";
import errorWrapper from "../middlewares/errorWrapper";

const getAllRole = errorWrapper(
  async (req: Request, res: Response) => {
    const { rows } = await pool.query(`SELECT * FROM Roles`);
    res.json(rows);
  },
  {
    statusCode: 500,
    message: "Couldn't get roles",
  }
);

const getRoleById = errorWrapper(
  async (req: Request, res: Response) => {
    const { roleid } = req.params;

    const { rows } = await pool.query(`SELECT * FROM Roles WHERE roleid = $1`, [
      roleid,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Role not found." });
    }

    res.json(rows[0]);
  },
  { statusCode: 500, message: "Couldn't get role by ID." }
);

const createRole = errorWrapper(
  async (req: Request, res: Response) => {
    const {
      roletitle,
      blogAccess,
      achievementAccess,
      bulkmailAccess,
      eventAccess,
      ecAccess,
      landingpageAccess,
      membersAccess,
      noticeAccess,
      rolesAccess,
      statisticsAccess,
      isDefaultRole,
    } = req.body;

    // Access Check
    const { rows: accessCheckRows } = await pool.query(
      `SELECT rolesAccess FROM Roles JOIN Users ON Roles.roleid = Users.roleid WHERE Users.userid = $1`,
      [req.jwtPayload.userid]
    );

    if (accessCheckRows.length === 0 || !accessCheckRows[0].rolesaccess) {
      return res.status(403).json({
        message: "Access denied. You do not have permission to create roles.",
      });
    }
    if (isDefaultRole) {
      const { rowCount } = await pool.query(
        `SELECT 1 FROM Roles WHERE isDefaultRole = true`
      );
      if (rowCount && rowCount > 0) {
        return res
          .status(400)
          .json({ message: "Only one default role is allowed." });
      }
    }

    const { rows } = await pool.query(
      `INSERT INTO Roles (roletitle, blogAccess, achievementAccess, bulkmailAccess, eventAccess, ecAccess, landingpageAccess, membersAccess, noticeAccess, rolesAccess, statisticsAccess, isDefaultRole) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
      [
        roletitle,
        blogAccess,
        achievementAccess,
        bulkmailAccess,
        eventAccess,
        ecAccess,
        landingpageAccess,
        membersAccess,
        noticeAccess,
        rolesAccess,
        statisticsAccess,
        isDefaultRole,
      ]
    );

    res.status(201).json(rows[0]);
  },
  { statusCode: 500, message: "Failed to create role." }
);

const updateRole = errorWrapper(
  async (req: Request, res: Response) => {
    const { roleid } = req.params;
    const {
      roletitle,
      blogAccess,
      achievementAccess,
      bulkmailAccess,
      eventAccess,
      ecAccess,
      landingpageAccess,
      membersAccess,
      noticeAccess,
      rolesAccess,
      statisticsAccess,
    } = req.body;

    const { rows: accessCheckRows } = await pool.query(
      `SELECT rolesAccess FROM Roles JOIN Users ON Roles.roleid = Users.roleid WHERE Users.userid = $1`,
      [req.jwtPayload.userid]
    );

    if (accessCheckRows.length === 0 || !accessCheckRows[0].rolesaccess) {
      return res.status(403).json({
        message: "Access denied. You do not have permission to create roles.",
      });
    }

    const { rows } = await pool.query(
      `UPDATE Roles SET roletitle = $1, blogAccess = $2, achievementAccess = $3, bulkmailAccess = $4, eventAccess = $5, ecAccess = $6, landingpageAccess = $7, membersAccess = $8, noticeAccess = $9, rolesAccess = $10, statisticsAccess = $11
         WHERE roleid = $12 RETURNING *`,
      [
        roletitle,
        blogAccess,
        achievementAccess,
        bulkmailAccess,
        eventAccess,
        ecAccess,
        landingpageAccess,
        membersAccess,
        noticeAccess,
        rolesAccess,
        statisticsAccess,
        roleid,
      ]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Role not found." });
    }

    res.json(rows[0]);
  },
  { statusCode: 500, message: "Failed to update role." }
);

const deleteRole = errorWrapper(
  async (req: Request, res: Response) => {
    const { roleid } = req.params;

    //   Check if the super role
    if (roleid === "1") {
      return res.status(400).json({ message: "Cannot delete the super role." });
    }
    // Check if the role is default
    const { rows: defaultCheckRows } = await pool.query(
      `SELECT isDefaultRole FROM Roles WHERE roleid = $1`,
      [roleid]
    );
    if (defaultCheckRows.length === 0) {
      return res.status(404).json({ message: "Role not found." });
    }
    if (defaultCheckRows[0].isDefaultRole) {
      return res
        .status(400)
        .json({ message: "Cannot delete the default role." });
    }

    // Access check
    const { rows: accessCheckRows } = await pool.query(
      `SELECT rolesAccess FROM Roles JOIN Users ON Roles.roleid = Users.roleid WHERE Users.userid = $1`,
      [req.jwtPayload.userid]
    );

    if (accessCheckRows.length === 0 || !accessCheckRows[0].rolesaccess) {
      return res.status(403).json({
        message: "Access denied. You do not have permission to create roles.",
      });
    }

    // Find default role ID
    const { rows: defaultRoleRows } = await pool.query(
      `SELECT roleid FROM Roles WHERE isDefaultRole = true`
    );
    if (defaultRoleRows.length === 0) {
      return res
        .status(500)
        .json({ message: "No default role found for reassignment." });
    }
    const defaultRoleId = defaultRoleRows[0].roleid;

    // Update users with this role to the default role
    await pool.query(`UPDATE Users SET roleid = $1 WHERE roleid = $2`, [
      defaultRoleId,
      roleid,
    ]);

    // Delete the role
    await pool.query(`DELETE FROM Roles WHERE roleid = $1`, [roleid]);

    res.status(204).send();
  },
  { statusCode: 500, message: "Failed to delete role." }
);

const updateDefaultRole = errorWrapper(
  async (req: Request, res: Response) => {
    const { roleid } = req.params;

    // Access check
    const { rows: accessCheckRows } = await pool.query(
      `SELECT rolesAccess FROM Roles JOIN Users ON Roles.roleid = Users.roleid WHERE Users.userid = $1`,
      [req.jwtPayload.userid]
    );

    if (accessCheckRows.length === 0 || !accessCheckRows[0].rolesaccess) {
      return res.status(403).json({
        message: "Access denied. You do not have permission to create roles.",
      });
    }

    try {
      // Start transaction
      await pool.query("BEGIN");

      // Set isDefaultRole = false for the current default role
      await pool.query(
        `UPDATE Roles SET isDefaultRole = false WHERE isDefaultRole = true`
      );

      // Set isDefaultRole = true for the specified role
      const { rows } = await pool.query(
        `UPDATE Roles SET isDefaultRole = true WHERE roleid = $1 RETURNING *`,
        [roleid]
      );

      if (rows.length === 0) {
        await pool.query("ROLLBACK"); // Rollback transaction on failure
        return res.status(404).json({ message: "Role not found." });
      }

      // Commit the transaction
      await pool.query("COMMIT");
      res.json(rows[0]);
    } catch (error) {
      await pool.query("ROLLBACK"); // Rollback transaction on error
      res.status(500).json({
        message: "Failed to update default role.",
        details: error,
      });
    }
  },
  { statusCode: 500, message: "Failed to update default role." }
);

export {
  createRole,
  deleteRole,
  getAllRole,
  getRoleById,
  updateDefaultRole,
  updateRole,
};
