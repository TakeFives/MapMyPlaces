import express from "express";
import userController from "../controllers/userController.js";
import {
  validateLogin,
  validateRegister,
} from "../middlewares/validationMiddleware.js";
import { extractTokenFromCookie } from "../middlewares/extractTokenFromCookie.js";

const router = express.Router();

router.post("/register", validateRegister, userController.registerUser);

router.post("/login", validateLogin, userController.loginUser);

router.post("/logout", userController.logoutUser);

router.get("/me", extractTokenFromCookie, userController.getMe);

router.get("/:id", userController.getUserById);

export default router;
