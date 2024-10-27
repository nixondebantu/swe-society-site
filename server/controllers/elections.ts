import { Request, Response } from "express";
import errorWrapper from "../middlewares/errorWrapper";
import CustomError from "../services/CustomError";
import pool from "../db/dbconnect";

// Create a new election
const createElection = errorWrapper(
    async (req: Request, res: Response) => {
        const { year, election_type, batch, election_commissioner, assistant_commissioner, candidate_form_date, election_date } = req.body;

        const { rows } = await pool.query(
            'INSERT INTO Elections (year, election_type, batch, election_commissioner, assistant_commissioner, candidate_form_date, election_date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [year, election_type, batch, election_commissioner, assistant_commissioner, candidate_form_date, election_date]
        );

        res.status(201).json(rows[0]);
    },
    { statusCode: 500, message: `Couldn't create election` }
);

// Get all elections
const getAllElections = errorWrapper(
    async (req: Request, res: Response) => {
        const { rows } = await pool.query('SELECT * FROM Elections');
        res.json(rows);
    },
    { statusCode: 500, message: `Couldn't get elections` }
);

// Get election by ID
const getElectionById = errorWrapper(
    async (req: Request, res: Response) => {
        const { electionid } = req.params;
        const { rows } = await pool.query('SELECT * FROM Elections WHERE electionid = $1', [electionid]);

        if (rows.length === 0) {
            throw new CustomError('Election not found', 404);
        }

        res.json(rows[0]);
    },
    { statusCode: 500, message: `Couldn't get election by electionid` }
);

// Update an election
const updateElection = errorWrapper(
    async (req: Request, res: Response) => {
        const { electionid } = req.params;
        const { year, election_type, batch, election_commissioner, assistant_commissioner, candidate_form_date, election_date } = req.body;

        const { rows } = await pool.query(
            'UPDATE Elections SET year = $1, election_type = $2, batch = $3, election_commissioner = $4, assistant_commissioner = $5, candidate_form_date = $6, election_date = $7 WHERE electionid = $8 RETURNING *',
            [year, election_type, batch, election_commissioner, assistant_commissioner, candidate_form_date, election_date, electionid]
        );

        if (rows.length === 0) {
            throw new CustomError('Election not found', 404);
        }

        res.json(rows[0]);
    },
    { statusCode: 500, message: `Couldn't update election` }
);

// Delete an election
const deleteElection = errorWrapper(
    async (req: Request, res: Response) => {
        const { electionid } = req.params;
        const { rowCount } = await pool.query('DELETE FROM Elections WHERE electionid = $1', [electionid]);

        if (rowCount === 0) {
            throw new CustomError('Election not found', 404);
        }

        res.json({ message: 'Election deleted successfully' });
    },
    { statusCode: 500, message: `Couldn't delete election` }
);

//--------------Election Posts----------------------------------

const createCommitteepost = errorWrapper(
    async (req: Request, res: Response) => {
        const { post_name } = req.body;

        const { rows } = await pool.query(
            'INSERT INTO Committeeposts (post_name) VALUES ($1) RETURNING *',
            [post_name]
        );

        res.status(201).json(rows[0]);
    },
    { statusCode: 500, message: `Couldn't create committeepost` }
);

// Get all committeeposts
const getAllCommitteeposts = errorWrapper(
    async (req: Request, res: Response) => {
        const { rows } = await pool.query('SELECT * FROM Committeeposts');
        res.json(rows);
    },
    { statusCode: 500, message: `Couldn't get committeeposts` }
);

// Get committeepost by ID
const getCommitteepostById = errorWrapper(
    async (req: Request, res: Response) => {
        const { committeepostid } = req.params;
        const { rows } = await pool.query('SELECT * FROM Committeeposts WHERE committeepostid = $1', [committeepostid]);

        if (rows.length === 0) {
            throw new CustomError('Committeepost not found', 404);
        }

        res.json(rows[0]);
    },
    { statusCode: 500, message: `Couldn't get committeepost by committeepostid` }
);

// Update a committeepost
const updateCommitteepost = errorWrapper(
    async (req: Request, res: Response) => {
        const { committeepostid } = req.params;
        const { post_name } = req.body;

        const { rows } = await pool.query(
            'UPDATE Committeeposts SET post_name = $1 WHERE committeepostid = $2 RETURNING *',
            [post_name, committeepostid]
        );

        if (rows.length === 0) {
            throw new CustomError('Committeepost not found', 404);
        }

        res.json(rows[0]);
    },
    { statusCode: 500, message: `Couldn't update committeepost` }
);

// Delete a committeepost
const deleteCommitteepost = errorWrapper(
    async (req: Request, res: Response) => {
        const { committeepostid } = req.params;
        const { rowCount } = await pool.query('DELETE FROM Committeeposts WHERE committeepostid = $1', [committeepostid]);

        if (rowCount === 0) {
            throw new CustomError('Committeepost not found', 404);
        }

        res.json({ message: 'Committeepost deleted successfully' });
    },
    { statusCode: 500, message: `Couldn't delete committeepost` }
);


//------------- commmitteee members ----------------------------------

const createCommitteeMember = errorWrapper(
    async (req: Request, res: Response) => {
        const { userid, postid, electionid } = req.body;

        const { rows } = await pool.query(
            'INSERT INTO Committee (userid, postid, electionid) VALUES ($1, $2, $3) RETURNING *',
            [userid, postid, electionid]
        );

        res.status(201).json(rows[0]);
    },
    { statusCode: 500, message: `Couldn't create committee member` }
);

// Get all committee members
const getAllCommitteeMembers = errorWrapper(
    async (req: Request, res: Response) => {
        const { rows } = await pool.query('SELECT * FROM Committee');
        res.json(rows);
    },
    { statusCode: 500, message: `Couldn't get committee members` }
);

// Get committee member by ID
const getCommitteeMemberById = errorWrapper(
    async (req: Request, res: Response) => {
        const { committeeid } = req.params;
        const { rows } = await pool.query('SELECT * FROM Committee WHERE committeeid = $1', [committeeid]);

        if (rows.length === 0) {
            throw new CustomError('Committee member not found', 404);
        }

        res.json(rows[0]);
    },
    { statusCode: 500, message: `Couldn't get committee member by committeeid` }
);

// Update a committee member
const updateCommitteeMember = errorWrapper(
    async (req: Request, res: Response) => {
        const { committeeid } = req.params;
        const { userid, postid, electionid } = req.body;

        const { rows } = await pool.query(
            'UPDATE Committee SET userid = $1, postid = $2, electionid = $3 WHERE committeeid = $4 RETURNING *',
            [userid, postid, electionid, committeeid]
        );

        if (rows.length === 0) {
            throw new CustomError('Committee member not found', 404);
        }

        res.json(rows[0]);
    },
    { statusCode: 500, message: `Couldn't update committee member` }
);

// Delete a committee member
const deleteCommitteeMember = errorWrapper(
    async (req: Request, res: Response) => {
        const { committeeid } = req.params;
        const { rowCount } = await pool.query('DELETE FROM Committee WHERE committeeid = $1', [committeeid]);

        if (rowCount === 0) {
            throw new CustomError('Committee member not found', 404);
        }

        res.json({ message: 'Committee member deleted successfully' });
    },
    { statusCode: 500, message: `Couldn't delete committee member` }
);

export {
    createElection,
    getAllElections,
    getElectionById,
    updateElection,
    deleteElection,


    createCommitteepost,
    getAllCommitteeposts,
    getCommitteepostById,
    updateCommitteepost,
    deleteCommitteepost,

    createCommitteeMember,
    getAllCommitteeMembers,
    getCommitteeMemberById,
    updateCommitteeMember,
    deleteCommitteeMember
};
