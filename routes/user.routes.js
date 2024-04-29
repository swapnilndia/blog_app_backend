import { Router } from "express";
import { validateSignup } from "../middlewares/validation.middleware.js";
import {
  signupMiddleware,
  signinMiddleware,
} from "../middlewares/user.middleware.js";
import { signup_controller ,signin_controller } from "../controllers/user.controller.js";

const router = Router();

router.post("/signup", validateSignup, signupMiddleware, signup_controller);
router.post("/signin", signinMiddleware, signin_controller);

export default router;
