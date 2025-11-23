import express from "express";
import { 
  getCourses, 
  getCoursesByTerm, 
  getCourseByCode, 
  createCourse, 
  updateCourse, 
  deleteCourse 
} from "../controllers/courseController.js";

const router = express.Router();

// Get all courses
router.get("/courses", getCourses);

// Get courses by term
router.get("/courses/term/:term", getCoursesByTerm);

// Get course by code
router.get("/courses/:code", getCourseByCode);

// Create new course
router.post("/courses", createCourse);

// Update course
router.put("/courses/:code", updateCourse);

// Delete course
router.delete("/courses/:code", deleteCourse);

export default router;
