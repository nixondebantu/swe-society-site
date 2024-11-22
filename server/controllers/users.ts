import { Request, Response } from "express";
import pool from "../db/dbconnect";
import errorWrapper from "../middlewares/errorWrapper";
import CustomError from "../services/CustomError";
const updateUser = errorWrapper(
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const updates = req.body;

    // Construct SET clause dynamically from the updates object
    let setClause = "";
    const values = [];

    for (const key in updates) {
      if (key !== "userId") {
        // Exclude userId from updates
        setClause += `${key} = $${values.length + 1}, `;
        values.push(updates[key]);
      }
    }

    // Remove trailing comma and space
    setClause = setClause.slice(0, -2);

    if (values.length === 0) {
      throw new CustomError("No fields provided for update", 404);
    }

    // Construct the SQL query
    const query = {
      text: `UPDATE Users SET ${setClause} WHERE userId = $${
        values.length + 1
      } RETURNING *`,
      values: [...values, userId],
    };

    try {
      const { rows } = await pool.query(query);

      if (rows.length === 0) {
        throw new CustomError("User not found", 404);
      }

      res.json(rows[0]);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Error updating user" });
    }
  },
  { statusCode: 500, message: `Couldn't update user` }
);

const getAllUsers = errorWrapper(
  async (req: Request, res: Response) => {
    try {
      const { rows } = await pool.query(`
        SELECT 
          u.userid,
          u.fullname,
          u.email,
          u.regno,
          u.session,
          r.roletitle AS role,
          u.profile_picture,
          u.bio,
          u.linkedin_id,
          u.github_id,
          u.stop_stalk_id,
          u.whatsapp,
          u.facebook_id,
          u.blood_group,
          u.school,
          u.college,
          u.hometown,
          u.cv,
          u.experience,
          u.projects,
          u.skills,
          u.is_alumni
        FROM Users u
        LEFT JOIN Roles r
        ON u.roleid = r.roleid
      `);

      res.json(rows);
    } catch (error) {
      console.error("Error fetching users with roles:", error);
      res.status(500).json({ message: `Couldn't get Users` });
    }
  },
  { statusCode: 500, message: `Couldn't get Users` }
);

const getUserById = errorWrapper(
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { rows } = await pool.query(
      `
      SELECT 
          u.userid,
          u.fullname,
          u.email,
          u.regno,
          u.session,
          r.roletitle AS role,
          u.profile_picture,
          u.bio,
          u.linkedin_id,
          u.github_id,
          u.stop_stalk_id,
          u.whatsapp,
          u.facebook_id,
          u.blood_group,
          u.school,
          u.college,
          u.hometown,
          u.cv,
          u.experience,
          u.projects,
          u.skills,
          u.is_alumni
        FROM Users u
        LEFT JOIN Roles r
        ON u.roleid = r.roleid WHERE userId = $1`,
      [userId]
    );

    if (rows.length === 0) {
      throw new CustomError("User not found", 404);
    }

    res.json(rows[0]);
  },
  { statusCode: 500, message: `Couldn't get User by UserId` }
);

const deleteUser = errorWrapper(
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { rowCount } = await pool.query(
      "DELETE FROM Users WHERE userId = $1",
      [userId]
    );

    if (rowCount === 0) {
      throw new CustomError("User not found", 404);
    }

    res.json({ message: "User deleted successfully" });
  },
  { statusCode: 500, message: `Couldn't delete User` }
);

const deleteMultipleUser = errorWrapper(
  async (req: Request, res: Response) => {
    const { userId } = req.body;

    if (!Array.isArray(userId) || userId.length === 0) {
      throw new CustomError("No user IDs provided", 400);
    }

    // Access check
    const { rows: accessCheckRows } = await pool.query(
      `SELECT membersaccess 
       FROM Roles 
       JOIN Users ON Roles.roleid = Users.roleid 
       WHERE Users.userid = $1`,
      [req.jwtPayload.userid]
    );

    // Ensure permission exists and is granted
    if (accessCheckRows.length === 0 || !accessCheckRows[0].membersaccess) {
      return res.status(403).json({
        message:
          "Access denied. You do not have permission to delete member(s).",
      });
    }

    // Proceed with deletion
    const { rowCount } = await pool.query(
      "DELETE FROM Users WHERE userId = ANY($1::int[])",
      [userId]
    );

    if (rowCount === 0) {
      throw new CustomError("No users found to delete", 404);
    }

    res.json({
      message: `${rowCount} user(s) deleted successfully`,
    });
  },
  { statusCode: 500, message: `Couldn't delete multiple Users` }
);

export { deleteMultipleUser, deleteUser, getAllUsers, getUserById, updateUser };
