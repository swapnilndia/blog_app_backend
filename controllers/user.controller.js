import User from "../models/users.models.js";
import * as bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/helperFunction.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const signup_controller = async (req, res) => {
  const { email, firstName, lastName, password } = req.body;
  try {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const createUser = await User.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });
    console.log(createUser);
    if (!createUser) {
      return res
        .status(400)
        .json(
          new ApiError(
            400,
            "Bad Request",
            "Please try after sometime",
            null,
            null
          )
        );
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          201,
          "Created",
          "User successfully Signed Up",
          createUser,
          null
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiError(
          "500",
          "Internal server error",
          "Something went wrong",
          error
        )
      );
  }
};

export const signin_controller = async (req, res) => {
  const { email } = req.body;
  const userId = req.userId;
  const userRole = req.userRole;
  try {
    const saltOrRounds = 10;
    const access_token = generateAccessToken(email, userId, userRole);
    const refresh_token = generateRefreshToken(email, userId, userRole);
    console.log(access_token, refresh_token);
    const hashed_refresh_token = await bcrypt.hash(refresh_token, saltOrRounds);
    const updateObject = await User.update(
      {
        access_Token: access_token, // Use camel case property names
        refreshToken: hashed_refresh_token, // Use camel case property names
      },
      {
        where: {
          id: userId,
        },
        returning: true,
      }
    );
    if (!updateObject) {
      return res
        .status(400)
        .json(
          new ApiError(
            400,
            "Bad Request",
            "Please try after sometime",
            null,
            null
          )
        );
    }
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "OK",
          "User successfully logged in",
          {
            email,
            userId,
            userRole,
            access_token,
            refresh_token: hashed_refresh_token,
          },
          null
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiError(
          "500",
          "Internal server error",
          "Something went wrong",
          error
        )
      );
  }
};
