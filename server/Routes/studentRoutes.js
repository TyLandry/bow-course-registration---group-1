import express from "express";
import requireAuth from "../middleware/requiredAuth.js";
import {
  getEnrolledCourses,
  getStudentNotifications,
  signupForCourse,
  deleteStudentFromCourse,
  createMessage,
  updateStudentProfile,
} from "../controllers/studentController.js";

const router = express.Router();

// GET /api/student/enrolled-courses
router.get("/enrolled-courses", requireAuth, getEnrolledCourses);

// GET /api/student/notifications
router.get("/notifications", requireAuth, getStudentNotifications);

// POST /api/student/register-course
router.post("/register-course", requireAuth, signupForCourse);

// DELETE /api/student/unenroll-course
router.delete("/unenroll-course", requireAuth, deleteStudentFromCourse);

// POST /api/student/submit-message
router.post("/submit-message", requireAuth, createMessage);

// PUT /api/student/profile
router.put("/profile", requireAuth, updateStudentProfile);

export default router;
