import { Router } from "express";
import { createBlog, deleteBlog, updateBlog } from "./blog.controller";

const router = Router();

router.route("/blogs").post(createBlog);
router.route("/blogs/:id").get(deleteBlog);
router.route("/blogs/:id").post(updateBlog);

export default router;