import { signupSchema } from "../utils/validationSchema.js";
import jwt from "jsonwebtoken";
import { isTokenExpired } from "../utils/helperFunction.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import Blog from "../models/blogs.models.js";
import Comment from "../models/comments.models.js";

export const validateSignup = async (req, res, next) => {
  try {
    await signupSchema.validate(req.body, { abortEarly: false });
    //If validation passes, proceed with signup logic
    next();
  } catch (error) {
    const errors = error.inner.map((err) => ({
      field: err.path,
      message: err.message,
    }));
    res
      .status(400)
      .json(
        new ApiError(400, "Bad Request", "One or more validation error", errors)
      );
  }
};

export const validateAccessToken = async (req, res, next) => {
  try {
    const access_Token = req.headers.authorization;
    if (!access_Token) {
      return res
        .status(400)
        .json(
          new ApiError(400, "Bad Request", "Access token is missing", null)
        );
    }
    const token = access_Token.split(" ")[1];
    const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
    const verifyToken = jwt.verify(token, secretKey);
    const tokenExpired = isTokenExpired(verifyToken?.exp);
    if (tokenExpired) {
      return res
        .status(400)
        .json(
          new ApiError(400, "Bad Request", "Access token is Expired", error)
        );
    }
    req.emailId = verifyToken.email;
    req.userId = verifyToken.userId;
    req.userRole = verifyToken.userRole;
    next();
  } catch (error) {
    return res
      .status(400)
      .json(
        new ApiError(
          500,
          "Internal Server Error",
          "Something went wrong",
          error
        )
      );
  }
};

export const authenticateBlogAction = async (req, res, next) => {
  const { blogId } = req.params;
  const userId = req.userId;
  const userRole = req.userRole;
  try {
    const blog = await Blog.findByPk(blogId);
    if (!blog) {
      return res
        .status(404)
        .json(
          new ApiError(
            404,
            "Blog Not Found",
            `Blog with the id ${blogId} was not found`,
            null
          )
        );
    }
    console.log(userRole === "US");
    if (blog.userId !== userId) {
      return res
        .status(403)
        .json(new ApiError(403, "Fobidden", `Insufficient Permissions`, null));
    }
    next();
  } catch (error) {
    return res
      .status(400)
      .json(
        new ApiError(
          500,
          "Internal Server Error",
          "Something went wrong",
          error
        )
      );
  }
};

export const authenticateCommentAction = async (req, res, next) => {
  const { commentId } = req.params;
  const userId = req.userId;
  const userRole = req.userRole;
  console.log(commentId, userId, userRole);
  try {
    const comment = await Comment.findByPk(commentId);
    console.log(comment);
    if (!comment) {
      return res
        .status(404)
        .json(
          new ApiError(
            404,
            "comment Not Found",
            `comment with the id ${commentId} was not found`,
            null
          )
        );
    }
    console.log(userId, userRole, comment);
    if (comment.userId !== userId) {
      return res
        .status(403)
        .json(new ApiError(403, "Fobidden", `Insufficient Permissions`, null));
    }
    next();
  } catch (error) {
    return res
      .status(400)
      .json(
        new ApiError(
          500,
          "Internal Server Error",
          "Something went wrong",
          error
        )
      );
  }
};
