import express from "express";
import userController from "../controllers/userController.js";
import { validateLogin, validateRegister } from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post("/register", validateRegister,userController.registerUser);

router.post("/login", validateLogin, userController.loginUser);

router.get("/:id", userController.getUserById);

export default router;