import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authpaths from "./routes/auth.js";
import requireAuth from "./middleware/requiredAuth.js";

dotenv.config();

const app = express();

//middlewares
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173", credentials: true }));
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

app.get("/api/auth/me", requireAuth, (req, res) => {
  res.json({
    user: { id: req.user.sub, email: req.user.email, name: req.user.name },
  });
});

app.get("/", (req, res) => {
  //Checking if server is running
  res.send("Server is running — use /api/auth/register or /api/auth/login via postman");
});

//start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

 //React dev origin
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
