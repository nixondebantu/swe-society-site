import { Request, Response } from "express";
import errorWrapper from "../middlewares/errorWrapper";
import CustomError from "../services/CustomError";
import pool from "../db/dbconnect";

// Create a new blog
const createBlog = errorWrapper(
    async (req: Request, res: Response) => {
        const { userid, headline, designation, current_institution, article, photos, blogtype, approval_status } = req.body;

        const { rows } = await pool.query(
            `INSERT INTO Blogs (userid, headline, designation, current_institution, article, photos, blogtype, approval_status)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [userid, headline, designation, current_institution, article, photos, blogtype, approval_status]
        );

        res.status(201).json(rows[0]);
    },
    { statusCode: 500, message: `Couldn't create blog` }
);


// Get all blogs
const getAllBlogs = errorWrapper(
    async (req: Request, res: Response) => {
        const blogsQuery = `
            SELECT b.*, u.fullname
            FROM Blogs b
            JOIN Users u ON b.userid = u.userid;
        `;

        const { rows } = await pool.query(blogsQuery);
        res.json(rows);
    },
    { statusCode: 500, message: `Couldn't get blogs` }
);


// Get a blog by ID
const getBlogById = errorWrapper(
    async (req: Request, res: Response) => {
        const { blogid } = req.params;

        const blogQuery = `
            SELECT b.*, u.fullname
            FROM Blogs b
            JOIN Users u ON b.userid = u.userid
            WHERE b.blogid = $1;
        `;

        const { rows } = await pool.query(blogQuery, [blogid]);

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
        const { userid, headline, designation, current_institution, article, photos, blogtype, approval_status } = req.body;

        const { rows } = await pool.query(
            `UPDATE Blogs
             SET userid = $1, headline = $2, designation = $3, current_institution = $4, article = $5, photos = $6, blogtype = $7, approval_status = $8
             WHERE blogid = $9 RETURNING *`,
            [userid, headline, designation, current_institution, article, photos, blogtype, approval_status, blogid]
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
