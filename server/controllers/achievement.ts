import { Request, Response } from "express";
import errorWrapper from "../middlewares/errorWrapper";
import CustomError from "../services/CustomError";
import pool from "../db/dbconnect";

// Create a new team
const createTeam = errorWrapper(
    async (req: Request, res: Response) => {
        const { teamname } = req.body;

        const { rows } = await pool.query(
            'INSERT INTO Teams (teamname) VALUES ($1) RETURNING *',
            [teamname]
        );

        res.status(201).json(rows[0]);
    },
    { statusCode: 500, message: `Couldn't create team` }
);

// Get all teams
const getAllTeams = errorWrapper(
    async (req: Request, res: Response) => {
        const { rows } = await pool.query('SELECT * FROM Teams');
        res.json(rows);
    },
    { statusCode: 500, message: `Couldn't get teams` }
);



// Update a team
const updateTeam = errorWrapper(
    async (req: Request, res: Response) => {
        const { teamid } = req.params;
        const { teamname } = req.body;

        const { rows } = await pool.query(
            'UPDATE Teams SET teamname = $1 WHERE teamid = $2 RETURNING *',
            [teamname, teamid]
        );

        if (rows.length === 0) {
            throw new CustomError('Team not found', 404);
        }

        res.json(rows[0]);
    },
    { statusCode: 500, message: `Couldn't update team` }
);

// Delete a team
const deleteTeam = errorWrapper(
    async (req: Request, res: Response) => {
        const { teamid } = req.params;
        const { rowCount } = await pool.query('DELETE FROM Teams WHERE teamid = $1', [teamid]);

        if (rowCount === 0) {
            throw new CustomError('Team not found', 404);
        }

        res.json({ message: 'Team deleted successfully' });
    },
    { statusCode: 500, message: `Couldn't delete team` }
);

//---------------------------- team members-----------------------

const addTeamMember = errorWrapper(
    async (req: Request, res: Response) => {
        const { userid, teamid } = req.body;

        const { rows } = await pool.query(
            'INSERT INTO TeamMembers (userid, teamid) VALUES ($1, $2) RETURNING *',
            [userid, teamid]
        );

        res.status(201).json(rows[0]);
    },
    { statusCode: 500, message: `Couldn't add team member` }
);

// Get all team members
const getAllTeamMembers = errorWrapper(
    async (req: Request, res: Response) => {
        const { rows } = await pool.query('SELECT * FROM TeamMembers');
        res.json(rows);
    },
    { statusCode: 500, message: `Couldn't get team members` }
);

// Get team members by team ID
const getTeamMembersByTeamId = errorWrapper(
    async (req: Request, res: Response) => {
        const { teamid } = req.params;
        const { rows } = await pool.query('SELECT * FROM TeamMembers WHERE teamid = $1', [teamid]);

        if (rows.length === 0) {
            throw new CustomError('No members found for this team', 404);
        }

        res.json(rows);
    },
    { statusCode: 500, message: `Couldn't get team members by teamid` }
);

// Remove a user from a team
const removeTeamMember = errorWrapper(
    async (req: Request, res: Response) => {
        const { userid, teamid } = req.body;

        const { rowCount } = await pool.query('DELETE FROM TeamMembers WHERE userid = $1 AND teamid = $2', [userid, teamid]);

        if (rowCount === 0) {
            throw new CustomError('Team member not found', 404);
        }

        res.json({ message: 'Team member removed successfully' });
    },
    { statusCode: 500, message: `Couldn't remove team member` }
);

// Achievement posts
const createAchievement = errorWrapper(
    async (req: Request, res: Response) => {
        const { teamid, eventname, organizer, venu, startdate, enddate, rank, rankarea, task, solution, techstack, resources, photos, approval_status } = req.body;

        const { rows } = await pool.query(
            `INSERT INTO Achievements (teamid, eventname, organizer, venu, startdate, enddate, rank, rankarea, task, solution, techstack, resources, photos, approval_status)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`,
            [teamid, eventname, organizer, venu, startdate, enddate, rank, rankarea, task, solution, techstack, resources, photos, approval_status]
        );

        res.status(201).json(rows[0]);
    },
    { statusCode: 500, message: `Couldn't create achievement` }
);

// Get all achievements
const getAllAchievements = errorWrapper(
    async (req: Request, res: Response) => {
        const { rows } = await pool.query('SELECT * FROM Achievements');
        res.json(rows);
    },
    { statusCode: 500, message: `Couldn't get achievements` }
);

// Get an achievement by ID
const getAchievementById = errorWrapper(
    async (req: Request, res: Response) => {
        const { achieveid } = req.params;
        const { rows } = await pool.query('SELECT * FROM Achievements WHERE achieveid = $1', [achieveid]);

        if (rows.length === 0) {
            throw new CustomError('Achievement not found', 404);
        }

        res.json(rows[0]);
    },
    { statusCode: 500, message: `Couldn't get achievement by achieveid` }
);

// Update an achievement
const updateAchievement = errorWrapper(
    async (req: Request, res: Response) => {
        const { achieveid } = req.params;
        const { teamid, eventname, organizer, venu, startdate, enddate, rank, rankarea, task, solution, techstack, resources, photos, approval_status } = req.body;

        const { rows } = await pool.query(
            `UPDATE Achievements SET teamid = $1, eventname = $2, organizer = $3, venu = $4, startdate = $5, enddate = $6, rank = $7, rankarea = $8, task = $9, solution = $10, techstack = $11, resources = $12, photos = $13, approval_status = $14
             WHERE achieveid = $15 RETURNING *`,
            [teamid, eventname, organizer, venu, startdate, enddate, rank, rankarea, task, solution, techstack, resources, photos, approval_status, achieveid]
        );

        if (rows.length === 0) {
            throw new CustomError('Achievement not found', 404);
        }

        res.json(rows[0]);
    },
    { statusCode: 500, message: `Couldn't update achievement` }
);

// Delete an achievement
const deleteAchievement = errorWrapper(
    async (req: Request, res: Response) => {
        const { achieveid } = req.params;
        const { rowCount } = await pool.query('DELETE FROM Achievements WHERE achieveid = $1', [achieveid]);

        if (rowCount === 0) {
            throw new CustomError('Achievement not found', 404);
        }

        res.json({ message: 'Achievement deleted successfully' });
    },
    { statusCode: 500, message: `Couldn't delete achievement` }
);

// custom api's

const getUserAchievements = errorWrapper(async (req: Request, res: Response) => {
    const { userid } = req.params;

    // Query to get achievements of the user
    const achievementsQuery = `
        SELECT
            a.achieveid,
            a.teamid,
            t.teamname,
            a.eventname,
            a.segment,
            a.organizer,
            a.venu,
            a.startdate,
            a.enddate,
            a.rank,
            a.rankarea,
            a.task,
            a.solution,
            a.techstack,
            a.resources,
            a.photos,
            a.approval_status,
            (
                SELECT json_agg(json_build_object('userid', u.userid, 'fullname', u.fullname, 'session', u.session))
                FROM TeamMembers tm
                JOIN Users u ON tm.userid = u.userid
                WHERE tm.teamid = a.teamid
            ) AS teamMembers
        FROM
            Achievements a
        JOIN
            TeamMembers tm ON a.teamid = tm.teamid
        JOIN
            Teams t ON a.teamid = t.teamid
        WHERE
            tm.userid = $1;
    `;

    const { rows } = await pool.query(achievementsQuery, [userid]);

    if (rows.length === 0) {
        throw new CustomError(`No achievements found for user ID ${userid}`, 404);
    }

    res.json({ achievement: rows });
}, {
    statusCode: 500,
    message: `Couldn't retrieve achievements`
});


export {
    createTeam,
    getAllTeams,
    updateTeam,
    deleteTeam,

    addTeamMember,
    getAllTeamMembers,
    getTeamMembersByTeamId,
    removeTeamMember,

    createAchievement,
    getAllAchievements,
    getAchievementById,
    updateAchievement,
    deleteAchievement,
    getUserAchievements
};
