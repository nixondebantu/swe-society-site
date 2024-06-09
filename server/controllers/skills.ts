import { Request, Response } from "express";
import errorWrapper from "../middlewares/errorWrapper";
import CustomError from "../services/CustomError";
import pool from "../db/dbconnect";

// Create a new skill
const createSkill = errorWrapper(
    async (req: Request, res: Response) => {
        const { skill, area } = req.body;

        const { rows } = await pool.query(
            'INSERT INTO Skills (skill, area) VALUES ($1, $2) RETURNING *',
            [skill, area]
        );

        res.status(201).json(rows[0]);
    },
    { statusCode: 500, message: `Couldn't create skill` }
);

// Get all skills
const getAllSkills = errorWrapper(
    async (req: Request, res: Response) => {
        const { rows } = await pool.query('SELECT * FROM Skills');
        res.json(rows);
    },
    { statusCode: 500, message: `Couldn't get skills` }
);

// Update a skill
const updateSkill = errorWrapper(
    async (req: Request, res: Response) => {
        const { skillId } = req.params;
        const { skill, area } = req.body;

        const { rows } = await pool.query(
            'UPDATE Skills SET skill = $1, area = $2 WHERE skill_id = $3 RETURNING *',
            [skill, area, skillId]
        );

        if (rows.length === 0) {
            throw new CustomError('Skill not found', 404);
        }

        res.json(rows[0]);
    },
    { statusCode: 500, message: `Couldn't update skill` }
);

// Delete a skill
const deleteSkill = errorWrapper(
    async (req: Request, res: Response) => {
        const { skillId } = req.params;
        const { rowCount } = await pool.query('DELETE FROM Skills WHERE skill_id = $1', [skillId]);

        if (rowCount === 0) {
            throw new CustomError('Skill not found', 404);
        }

        res.json({ message: 'Skill deleted successfully' });
    },
    { statusCode: 500, message: `Couldn't delete skill` }
);

// Create a new userSkill
const createUserSkill = errorWrapper(
    async (req: Request, res: Response) => {
        const { userid, skill_id } = req.body;

        const { rows } = await pool.query(
            'INSERT INTO UserSkills (userid, skill_id) VALUES ($1, $2) RETURNING *',
            [userid, skill_id]
        );

        res.status(201).json(rows[0]);
    },
    { statusCode: 500, message: `Couldn't create user skill` }
);

// Get all user skills
const getAllUserSkills = errorWrapper(
    async (req: Request, res: Response) => {
        const { rows } = await pool.query('SELECT * FROM UserSkills');
        res.json(rows);
    },
    { statusCode: 500, message: `Couldn't get user skills` }
);

// Update a userSkill
const updateUserSkill = errorWrapper(
    async (req: Request, res: Response) => {
        const { userSkillId } = req.params;
        const { userid, skill_id } = req.body;

        const { rows } = await pool.query(
            'UPDATE UserSkills SET userid = $1, skill_id = $2 WHERE userskillid = $3 RETURNING *',
            [userid, skill_id, userSkillId]
        );

        if (rows.length === 0) {
            throw new CustomError('User skill not found', 404);
        }

        res.json(rows[0]);
    },
    { statusCode: 500, message: `Couldn't update user skill` }
);

// Delete a userSkill
const deleteUserSkill = errorWrapper(
    async (req: Request, res: Response) => {
        const { userSkillId } = req.params;
        const { rowCount } = await pool.query('DELETE FROM UserSkills WHERE userskillid = $1', [userSkillId]);

        if (rowCount === 0) {
            throw new CustomError('User skill not found', 404);
        }

        res.json({ message: 'User skill deleted successfully' });
    },
    { statusCode: 500, message: `Couldn't delete user skill` }
);

export {
    createSkill,
    getAllSkills,
    updateSkill,
    deleteSkill,
    createUserSkill,
    getAllUserSkills,
    updateUserSkill,
    deleteUserSkill
};
