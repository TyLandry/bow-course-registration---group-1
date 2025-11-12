import jwt from "jsonwebtoken";
import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.js"; 
import { body, validationResult } from "express-validator";

const router = express.Router();

function generateToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" } //keep users logged in longer if you like
  );
}

function setAuthCookie(res, token) {
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production", 
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
}

//POST /api/auth/register
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    let { firstName, lastName, email, phone, birthday, department, program, country, password } = req.body;
    email = email.toLowerCase();

    try {
      const exists = await User.findOne({ email });
      if (exists) return res.status(409).json({ message: "User already exists" });

      const hashed = await bcrypt.hash(password, 10);

      const user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        birthday,
        department,
        program,
        country,
        password: hashed, //store hashed password
      });

      const token = generateToken(user);
      setAuthCookie(res, token);

      return res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        birthday: user.birthday,
        department: user.department,
        program: user.program,
        country: user.country
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  }
);

//POST /api/auth/login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    let { email, password } = req.body;
    email = email.toLowerCase();

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Invalid credentials" });

      const ok = await bcrypt.compare(password, user.password);
      if (!ok) return res.status(400).json({ message: "Invalid credentials" });

      const token = generateToken(user);
      setAuthCookie(res, token);

      return res.json({
        message: "Login successful",
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role ?? "student" 
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  }
);

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  res.json({ ok: true });
});

export default router;
