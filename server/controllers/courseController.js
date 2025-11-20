import express from "express";
import Course from "../models/course.js";

const router = express.Router();

// Get all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    return res.status(200).json(courses);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export default router;
