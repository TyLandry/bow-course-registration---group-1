import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import User from "../models/user.js";

function generateToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" } //keep users logged in longer if you like
  );
}

function setAuthCookie(res, token) {
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

const normalizeEmail = (value = "") => value.trim().toLowerCase();
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const buildEmailQuery = (email) => ({
  email: { $regex: new RegExp(`^${escapeRegex(email)}$`, "i") },
});

export async function register(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  let {
    id,
    firstName,
    lastName,
    email,
    phone,
    birthday,
    department,
    program,
    country,
    password,
    role,
  } = req.body;
  email = normalizeEmail(email);

  try {
    const exists = await User.findOne(buildEmailQuery(email));
    if (exists) return res.status(409).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      id,
      firstName,
      lastName,
      email,
      phone,
      birthday,
      department,
      program,
      country,
      password: hashed, //store hashed password
      role,
    });

    const token = generateToken(user);
    setAuthCookie(res, token);

    return res.status(201).json({
      id: user._id,
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      birthday: user.birthday,
      department: user.department,
      program: user.program,
      country: user.country,
      role: user.role,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function login(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  let { email, password } = req.body;
  email = normalizeEmail(email);

  try {
    const user = await User.findOne(buildEmailQuery(email));
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    let ok = false;
    const storedPassword = user.password || "";

    if (storedPassword.startsWith("$2")) {
      ok = await bcrypt.compare(password, storedPassword);
    } else {
      ok = storedPassword === password;
      if (ok) {
        user.password = await bcrypt.hash(password, 10);
        await user.save();
      }
    }

    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    setAuthCookie(res, token);

    return res.json({
      message: "Login successful",
      id: user._id,
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      birthday: user.birthday,
      department: user.department,
      program: user.program,
      country: user.country,
      role: user.role ?? "student",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

export function logout(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  res.json({ ok: true });
}
