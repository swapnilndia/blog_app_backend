import { Router } from "express";
import {
  create_Blog,
  get_All_Blogs,
  get_Specific_Blog,
  delete_Blog,
  update_Blog,
  add_New_Comment,
  get_Comments,
  update_Comment,
  delete_Comment,
} from "../controllers/blog.controller.js";
import {
  validateAccessToken,
  authenticateBlogAction,
  authenticateCommentAction,
} from "../middlewares/validation.middleware.js";

const router = Router();

//Create new blog
router.post("/", validateAccessToken, create_Blog);

//Get List of blogs
router.get("/", validateAccessToken, get_All_Blogs);

//Get Specific of blogs
router.get("/:blogId", validateAccessToken, get_Specific_Blog);

//Delete Specific blog
router.delete(
  "/:blogId",
  validateAccessToken,
  authenticateBlogAction,
  delete_Blog
);

//Update Specific blog
router.put(
  "/:blogId",
  validateAccessToken,
  authenticateBlogAction,
  update_Blog
);

//Add comments Specific blog
router.post("/:blogId/comments", validateAccessToken, add_New_Comment);

//Get list of comments for Specific blog
router.get("/:blogId/comments", validateAccessToken, get_Comments);

//Update Specific comment from blog
router.put(
  "/:blogId/comments/:commentId",
  validateAccessToken,
  authenticateCommentAction,
  update_Comment
);

//Delete Specific comment from blog
router.delete(
  "/:blogId/comments/:commentId",
  validateAccessToken,
  authenticateCommentAction,
  delete_Comment
);
export default router;
