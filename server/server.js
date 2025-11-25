import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authpaths from "./routes/authRoutes.js";
import programpaths from "./routes/programRoutes.js";
import coursepaths from "./routes/courseRoutes.js";
import studentpaths from "./routes/studentRoutes.js";
import adminpaths from "./routes/adminRoutes.js";
import messagepaths from "./routes/messageRoutes.js";
import requireAuth from "./middleware/requiredAuth.js";
import User from "./models/user.js";

dotenv.config();

const app = express();

//middlewares
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

//port
const PORT = process.env.PORT || 5050;

//connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB")) //Making sure that API is connected to MongoDB
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });

// routes
app.use("/api/auth", authpaths);
app.use("/api", programpaths);
app.use("/api", coursepaths);
app.use("/api", messagepaths);
app.use("/api/student", requireAuth("student"), studentpaths);
app.use("/api/admin", requireAuth("admin"), adminpaths);

app.get("/api/auth/me", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
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
    console.error("Failed to fetch authenticated user", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/", (req, res) => {
  //Checking if server is running
  res.send(
    "Server is running — use /api/auth/register or /api/auth/login via postman"
  );
});

//start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
