import express from "express";
import { body } from "express-validator";
import { register, login, logout } from "../controllers/authController.js";

const router = express.Router();

//POST /api/auth/register
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  register
);

//POST /api/auth/login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  login
);

router.post("/logout", logout);

export default router;
