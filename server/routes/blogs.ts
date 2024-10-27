import express from "express";
const router = express.Router();

import {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
  } from "../controllers/blogs";

  router.route("/create").post(createBlog);
  router.route("/:blogid").get(getBlogById);
  router.route("/").get(getAllBlogs);
  router.route("/:blogid").put(updateBlog);
  router.route("/:blogid").delete(deleteBlog);


  export default router;