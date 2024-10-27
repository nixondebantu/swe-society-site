"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const blogs_1 = require("../controllers/blogs");
router.route("/create").post(blogs_1.createBlog);
router.route("/:blogid").get(blogs_1.getBlogById);
router.route("/").get(blogs_1.getAllBlogs);
router.route("/:blogid").put(blogs_1.updateBlog);
router.route("/:blogid").delete(blogs_1.deleteBlog);
exports.default = router;
