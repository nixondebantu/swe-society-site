"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.updateBlog = exports.getBlogById = exports.getAllBlogs = exports.createBlog = void 0;
const errorWrapper_1 = __importDefault(require("../middlewares/errorWrapper"));
const CustomError_1 = __importDefault(require("../services/CustomError"));
const dbconnect_1 = __importDefault(require("../db/dbconnect"));
// Create a new blog
const createBlog = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userid, headline, designation, current_institution, article, photos, blogtype, approval_status } = req.body;
    const { rows } = yield dbconnect_1.default.query(`INSERT INTO Blogs (userid, headline, designation, current_institution, article, photos, blogtype, approval_status)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, [userid, headline, designation, current_institution, article, photos, blogtype, approval_status]);
    res.status(201).json(rows[0]);
}), { statusCode: 500, message: `Couldn't create blog` });
exports.createBlog = createBlog;
// Get all blogs
const getAllBlogs = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogsQuery = `
            SELECT b.*, u.fullname
            FROM Blogs b
            JOIN Users u ON b.userid = u.userid;
        `;
    const { rows } = yield dbconnect_1.default.query(blogsQuery);
    res.json(rows);
}), { statusCode: 500, message: `Couldn't get blogs` });
exports.getAllBlogs = getAllBlogs;
// Get a blog by ID
const getBlogById = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogid } = req.params;
    const blogQuery = `
            SELECT b.*, u.fullname
            FROM Blogs b
            JOIN Users u ON b.userid = u.userid
            WHERE b.blogid = $1;
        `;
    const { rows } = yield dbconnect_1.default.query(blogQuery, [blogid]);
    if (rows.length === 0) {
        throw new CustomError_1.default('Blog not found', 404);
    }
    res.json(rows[0]);
}), { statusCode: 500, message: `Couldn't get blog by blogid` });
exports.getBlogById = getBlogById;
// Update a blog
const updateBlog = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogid } = req.params;
    const { userid, headline, designation, current_institution, article, photos, blogtype, approval_status } = req.body;
    const { rows } = yield dbconnect_1.default.query(`UPDATE Blogs
             SET userid = $1, headline = $2, designation = $3, current_institution = $4, article = $5, photos = $6, blogtype = $7, approval_status = $8
             WHERE blogid = $9 RETURNING *`, [userid, headline, designation, current_institution, article, photos, blogtype, approval_status, blogid]);
    if (rows.length === 0) {
        throw new CustomError_1.default('Blog not found', 404);
    }
    res.json(rows[0]);
}), { statusCode: 500, message: `Couldn't update blog` });
exports.updateBlog = updateBlog;
// Delete a blog
const deleteBlog = (0, errorWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogid } = req.params;
    const { rowCount } = yield dbconnect_1.default.query('DELETE FROM Blogs WHERE blogid = $1', [blogid]);
    if (rowCount === 0) {
        throw new CustomError_1.default('Blog not found', 404);
    }
    res.json({ message: 'Blog deleted successfully' });
}), { statusCode: 500, message: `Couldn't delete blog` });
exports.deleteBlog = deleteBlog;
