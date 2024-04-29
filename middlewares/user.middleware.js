import User from "../models/users.models.js";
import * as bcrypt from "bcrypt";
import ApiError from "../utils/ApiError.js";

export const signupMiddleware = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const isExistingUser = await User.findOne({ where: { email: email } });
  if (isExistingUser) {
    return res
      .status(400)
      .json(
        new ApiError(
          400,
          "Bad Request",
          "User with Email already exists",
          null,
          null
        )
      );
  }
  next();
};

export const signinMiddleware = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json(
        new ApiError(
          400,
          "Bad Request",
          "Email and Password are required fields",
          null,
          null
        )
      );
  }
  const isExistingUser = await User.findOne({ where: { email: email } });
  if (!isExistingUser) {
    return res
      .status(400)
      .json(
        new ApiError(
          400,
          "Bad Request",
          "User with Email does not exists",
          null,
          null
        )
      );
  }
  const hashedPassword = await isExistingUser.password;
  const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
  if (!isPasswordCorrect) {
    return res
      .status(400)
      .json(
        new ApiError(
          400,
          "Bad Request",
          "Email or Password does not match",
          null,
          null
        )
      );
  }
  req.userId = isExistingUser.id;
  req.userRole = isExistingUser.userRole;
  next();
};
