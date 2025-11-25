import express from "express";
import {
  getStudents,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/adminController.js";

const router = express.Router();

// Get all student infomation
router.get("/students", getStudents);

// Create new course
router.post("/courses", createCourse);

// Update course
router.put("/courses/:code", updateCourse);

// Delete course
router.delete("/courses/:code", deleteCourse);

export default router;
