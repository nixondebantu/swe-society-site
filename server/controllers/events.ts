import { Request, Response } from "express";
import errorWrapper from "../middlewares/errorWrapper";
import CustomError from "../services/CustomError";
import pool from "../db/dbconnect";

const createEvent = errorWrapper(
  async (req: Request, res: Response) => {
    const { start_time, end_time, headline, event_details, coverphoto } =
      req.body;

    // Access Check
    const { rows: accessCheckRows } = await pool.query(
      `SELECT eventAccess FROM Roles JOIN Users ON Roles.roleid = Users.roleid WHERE Users.userid = $1`,
      [req.jwtPayload.userid]
    );

    if (accessCheckRows.length === 0 || !accessCheckRows[0].eventaccess) {
      throw new CustomError(
        "Access denied. You do not have permission to create events.",
        403
      );
    }

    const { rows } = await pool.query(
      "INSERT INTO Events (event_creator, start_time, end_time, headline, event_details, coverphoto) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        req.jwtPayload.userid,
        start_time,
        end_time,
        headline,
        event_details,
        coverphoto,
      ]
    );

    res.status(201).json(rows[0]);
  },
  { statusCode: 500, message: `Couldn't create event` }
);

const getAllEvents = errorWrapper(
  async (req: Request, res: Response) => {
    const { rows } = await pool.query(
      "SELECT eventid, start_time, end_time, headline, event_details, coverphoto, fullname, created_time FROM Events JOIN Users ON Events.event_creator = Users.userId ORDER BY start_time DESC"
    );
    res.json(rows);
  },
  { statusCode: 500, message: `Couldn't get events` }
);

const updateEvent = errorWrapper(
  async (req: Request, res: Response) => {
    const { eventid } = req.params;
    const { start_time, end_time, headline, event_details, coverphoto } =
      req.body;

    // Access Check
    const { rows: accessCheckRows } = await pool.query(
      `SELECT eventAccess FROM Roles JOIN Users ON Roles.roleid = Users.roleid WHERE Users.userid = $1`,
      [req.jwtPayload.userid]
    );

    if (accessCheckRows.length === 0 || !accessCheckRows[0].eventaccess) {
      throw new CustomError(
        "Access denied. You do not have permission to update events.",
        403
      );
    }

    const { rows } = await pool.query(
      "UPDATE Events SET event_creator = $1, start_time = $2, end_time = $3, headline = $4, event_details = $5, coverphoto = $6 WHERE eventid = $7 RETURNING *",
      [
        req.jwtPayload.userid,
        start_time,
        end_time,
        headline,
        event_details,
        coverphoto,
        eventid,
      ]
    );

    if (rows.length === 0) {
      throw new CustomError("Event not found", 404);
    }

    res.json(rows[0]);
  },
  { statusCode: 500, message: `Couldn't update event` }
);

const getEventById = errorWrapper(
  async (req: Request, res: Response) => {
    const { eventid } = req.params;
    const { rows } = await pool.query(
      "SELECT * FROM Events WHERE eventid = $1",
      [eventid]
    );

    if (rows.length === 0) {
      throw new CustomError("Event not found", 404);
    }

    res.json(rows[0]);
  },
  { statusCode: 500, message: `Couldn't get event by eventid` }
);

const deleteEvent = errorWrapper(
  async (req: Request, res: Response) => {
    const { eventid } = req.params;

    // Access Check
    const { rows: accessCheckRows } = await pool.query(
      `SELECT eventAccess FROM Roles JOIN Users ON Roles.roleid = Users.roleid WHERE Users.userid = $1`,
      [req.jwtPayload.userid]
    );

    if (accessCheckRows.length === 0 || !accessCheckRows[0].eventaccess) {
      throw new CustomError(
        "Access denied. You do not have permission to delete events.",
        403
      );
    }

    const { rowCount } = await pool.query(
      "DELETE FROM Events WHERE eventid = $1",
      [eventid]
    );

    if (rowCount === 0) {
      throw new CustomError("Event not found", 404);
    }

    res.json({ message: "Event deleted successfully" });
  },
  { statusCode: 500, message: `Couldn't delete event` }
);

export { createEvent, getAllEvents, updateEvent, deleteEvent, getEventById };
