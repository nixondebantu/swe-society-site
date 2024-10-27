import { Request, Response } from "express";
import errorWrapper from "../middlewares/errorWrapper";
import CustomError from "../services/CustomError";
import pool from "../db/dbconnect";

// Create a new blog
const createBlog = errorWrapper(
    async (req: Request, res: Response) => {
        const { userid, headline, article, photos, blogtype, approval_status } = req.body;

        const { rows } = await pool.query(
            `INSERT INTO Blogs (userid, headline, article, photos, blogtype, approval_status)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [userid, headline, article, photos, blogtype, approval_status]
        );

        res.status(201).json(rows[0]);
    },
    { statusCode: 500, message: `Couldn't create blog` }
);

// Get all blogs
const getAllBlogs = errorWrapper(
    async (req: Request, res: Response) => {
        const { rows } = await pool.query('SELECT * FROM Blogs');
        res.json(rows);
    },
    { statusCode: 500, message: `Couldn't get blogs` }
);

// Get a blog by ID
const getBlogById = errorWrapper(
    async (req: Request, res: Response) => {
        const { blogid } = req.params;
        const { rows } = await pool.query('SELECT * FROM Blogs WHERE blogid = $1', [blogid]);

        if (rows.length === 0) {
            throw new CustomError('Blog not found', 404);
        }

        res.json(rows[0]);
    },
    { statusCode: 500, message: `Couldn't get blog by blogid` }
);

// Update a blog
const updateBlog = errorWrapper(
    async (req: Request, res: Response) => {
        const { blogid } = req.params;
        const { userid, headline, article, photos, blogtype, approval_status } = req.body;

        const { rows } = await pool.query(
            `UPDATE Blogs SET userid = $1, headline = $2, article = $3, photos = $4, blogtype = $5, approval_status = $6
             WHERE blogid = $7 RETURNING *`,
            [userid, headline, article, photos, blogtype, approval_status, blogid]
        );

        if (rows.length === 0) {
            throw new CustomError('Blog not found', 404);
        }

        res.json(rows[0]);
    },
    { statusCode: 500, message: `Couldn't update blog` }
);

// Delete a blog
const deleteBlog = errorWrapper(
    async (req: Request, res: Response) => {
        const { blogid } = req.params;
        const { rowCount } = await pool.query('DELETE FROM Blogs WHERE blogid = $1', [blogid]);

        if (rowCount === 0) {
            throw new CustomError('Blog not found', 404);
        }

        res.json({ message: 'Blog deleted successfully' });
    },
    { statusCode: 500, message: `Couldn't delete blog` }
);

export {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
};
