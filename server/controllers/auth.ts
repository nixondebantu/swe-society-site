import { Request, Response } from "express";
import errorWrapper from "../middlewares/errorWrapper";
import CustomError from "../services/CustomError";
import { generateToken } from "../services/Token";
import { sendMail } from "../services/mailService";
import { generateRandomPassword } from "../services/utils";

import bcrypt from "bcrypt";
import pool from "../db/dbconnect";

const createUser = errorWrapper(
  async (req: Request, res: Response) => {
    const { regno, session, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const { rows } = await pool.query(
      "INSERT INTO Users (regno, session, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [regno, session, email, hashedPassword, role]
    );

    res.status(201).json(rows[0]);
  },
  { statusCode: 500, message: `Couldn't create user` }
);

const login = errorWrapper(
  async (req: Request, res: Response) => {
    const { regno, password, longsession } = req.body;

    const { rows } = await pool.query("SELECT * FROM Users WHERE regno = $1 ", [
      regno,
    ]);

    if (rows.length === 0) {
      throw new CustomError("This regno do not exists", 404);
    } else {
      // User found, return user details
      //  res.json(rows[0]);

      const isPasswordValid = await bcrypt.compare(password, rows[0].password);

      if (!isPasswordValid) {
        throw new Error("Invalid regno or password");
      }

      const token = generateToken(
        {
          id: rows[0].id,
          role: rows[0].role,
          regno: rows[0].regno,
        },
        longsession ? "30d" : "1h"
      );

      res.json({ user: rows[0], token });
    }
  },
  { statusCode: 500, message: `Login Failed` }
);

const createUserWithMailSend = errorWrapper(
  async (req: Request, res: Response) => {
    const { regno, session, email, role } = req.body;
    const password = generateRandomPassword(8);
    const hashedPassword = await bcrypt.hash(password, 10);

    const { rows } = await pool.query(
      "INSERT INTO Users (regno, session, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [regno, session, email, hashedPassword, role]
    );

    sendMail(
      regno,
      email,
      `Welcome To SWE Society!`,
      `Your account has been created by Admin! Here are the Credentials:`,
      `regno: ${regno}<br>email: ${email}<br> password: ${password}<br><br>Regards,<br>SWE Society Committee`
    );

    res.status(201).json(rows[0]);
  },
  { statusCode: 500, message: `Couldn't create user` }
);

const createMultiUsersWithMailSend = errorWrapper(
  async (req: Request, res: Response) => {
    const users = req.body;
    const failedUsers = [];

    for (const user of users) {
      const { regno, session, email } = user;

      // Check if registration number or email already exists
      const regnoExists = await pool.query(
        "SELECT 1 FROM Users WHERE regno = $1",
        [regno]
      );
      const emailExists = await pool.query(
        "SELECT 1 FROM Users WHERE email = $1",
        [email]
      );

      if (regnoExists.rows.length > 0) {
        failedUsers.push({
          regno,
          email,
          message: "Registration number already exists",
        });
        continue;
      }

      if (emailExists.rows.length > 0) {
        failedUsers.push({
          regno,
          email,
          message: "Email address already exists",
        });
        continue;
      }

      const password = generateRandomPassword(8);
      const hashedPassword = await bcrypt.hash(password, 10);

      try {
        const { rows } = await pool.query(
          "INSERT INTO Users (regno, session, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
          [regno, session, email, hashedPassword]
        );

        sendMail(
          regno,
          email,
          `Welcome To SWE Society!`,
          `Your account has been created by Admin! Here are the Credentials:`,
          `regno: ${regno}<br>email: ${email}<br>password: ${password}<br><br>Regards,<br>SWE Society Committee`
        );
      } catch (error) {
        console.error(`Failed to create user with regno ${regno}:`, error);
        failedUsers.push({ regno, email, message: "Failed to create user" });
      }
    }

    if (failedUsers.length > 0) {
      res.status(207).json({
        message: "Some users could not be created",
        failedUsers,
      });
    } else {
      res.status(201).json({
        message: "All users created successfully",
      });
    }
  },
  { statusCode: 500, message: `Couldn't create users` }
);

const updateUserPassword = errorWrapper(
  async (req: Request, res: Response) => {
    const { userid } = req.body;

    try {
      // Find user details by userid
      const userResult = await pool.query(
        "SELECT regno, email FROM Users WHERE userid = $1",
        [userid]
      );

      if (userResult.rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const { regno, email } = userResult.rows[0];

      // Generate a new password
      const newPassword = generateRandomPassword(8);
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password in the database
      await pool.query(
        "UPDATE Users SET password = $1 WHERE userid = $2 RETURNING *",
        [hashedPassword, userid]
      );

      // Send email with the new credentials
      sendMail(
        regno,
        email,
        `Your Password Has Been Updated`,
        `Your password has been updated by Admin. Here are your new credentials:`,
        `regno: ${regno}<br>email: ${email}<br>password: ${newPassword}<br><br>Regards,<br>SWE Society Committee`
      );

      // Return the userid in the response
      res.status(200).json({ userid });
    } catch (error) {
      console.error(`Failed to update password for userid ${userid}:`, error);
      res.status(500).json({ message: `Couldn't update user's password` });
    }
  },
  { statusCode: 500, message: `Couldn't update user's password` }
);

const changePass = errorWrapper(
  async (req: Request, res: Response) => {
    const { regno, oldpass, newpass } = req.body;

    const userQueryResult = await pool.query(
      "SELECT * FROM Users WHERE regno = $1",
      [regno]
    );
    if (userQueryResult.rows.length === 0) {
      throw new CustomError("This regno do not exists", 404);
    } else {
      const isPasswordValid = await bcrypt.compare(
        oldpass,
        userQueryResult.rows[0].password
      );
      if (!isPasswordValid) {
        throw new Error("Old password doesn't match");
      }
      const hashedPassword = await bcrypt.hash(newpass, 10);
      await pool.query("UPDATE Users SET password = $1 WHERE regno = $2", [
        hashedPassword,
        regno,
      ]);
      sendMail(
        regno,
        userQueryResult.rows[0].email,
        `Your Password Has Been Changed`, //mail subject
        `Your password for the SWE Society account associated with registration number ${regno} has been successfully changed. If you did not initiate this change, please contact our committeee immediately.<br><br>Regards,<br><strong>SWE Society Committee</strong><br><br>`,
        `<p style="text-align: center;"><span style="font-size: 12px;">This is an automated message. Please do not reply to this email.</span></p>`
      );
      res.json({ message: "Password changed successfully" });
    }
  },
  { statusCode: 500, message: `Can't changed password` }
);

export {
  changePass,
  createMultiUsersWithMailSend,
  createUser,
  createUserWithMailSend,
  login,
  updateUserPassword,
};
