import express from "express";
import requireAuth from "../middleware/requiredAuth.js";
import User from "../models/user.js";
import Course from "../models/course.js";
import Enrollment from "../models/enrollment.js";
import Message from "../models/message.js";

const router = express.Router();

// GET /api/student/enrolled-courses - this gets courses the student is enrolled in
router.get("/enrolled-courses", requireAuth, async (req, res) => {
  try {
    const studentId = req.user.id; // this gets the student's ID from their login

    // courses the student is enrolled in
    const enrollments = await Enrollment.find({ studentId });
    
    // converts to what frontend expects, an array of course objects
    const enrolledCourses = enrollments.map(enrollment => {
      return {
        code: enrollment.courseCode,        // course code like "COMP1011"
        name: enrollment.courseName,        // course name like "Programming"
        instructor: enrollment.instructor,   // teacher name
        term: enrollment.term,              // when it's offered like "Fall 2024"
        status: 'In Progress'               // show as "In Progress" on frontend
      };
    });
    // tells how many courses were found for this student, for debugging
    res.status(200).json(enrolledCourses);
  } catch (error) {
    console.error('Error getting enrolled courses:', error);
    res.status(500).json({ message: 'Could not get your courses' });
  }
});

// GET /api/student/notifications - Get student notifications  
router.get("/notifications", requireAuth, async (req, res) => {
  try {
    // Mock notifications data
    const mockNotifications = [
      {
        id: 1,
        icon: "📚",
        title: "New course available: Advanced React",
        date: new Date().toLocaleDateString()
      }
    ];

    res.status(200).json(mockNotifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Failed to fetch notifications' });
  }
});

// POST /api/student/register-course - Sign up student for a new course
router.post("/register-course", requireAuth, async (req, res) => {
  try {
    const { courseCode } = req.body;  // Get course code from the form
    const studentId = req.user.id;    // Get student ID from login

    
    if (!courseCode) {
      return res.status(400).json({ message: 'Course code is required' });
    }

    
    const course = await Course.findOne({ code: courseCode });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    
    const alreadyEnrolled = await Enrollment.findOne({ 
      studentId: studentId, 
      courseCode: courseCode 
    });
    if (alreadyEnrolled) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    
    const newEnrollment = await Enrollment.create({
      studentId: studentId,
      courseCode: course.code,
      courseName: course.name,
      instructor: course.instructor || 'TBD',
      term: course.term,
      status: 'enrolled'
    });

    
    const responseData = {
      code: newEnrollment.courseCode,
      name: newEnrollment.courseName,
      instructor: newEnrollment.instructor,
      term: newEnrollment.term,
      status: 'In Progress'
    };

    res.status(201).json({ 
      message: 'Successfully registered for course',
      enrollment: responseData 
    });
  } catch (error) {
    // if there's a database error about duplicate enrollment
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }
    console.error('Error registering for course:', error);
    res.status(500).json({ message: 'Failed to register for course' });
  }
});

// DELETE /api/student/unenroll-course - Remove student from a course
router.delete("/unenroll-course", requireAuth, async (req, res) => {
  try {
    const { courseCode } = req.body;  // Get course code from the form
    const studentId = req.user.id;    // Get student ID from login

    
    if (!courseCode) {
      return res.status(400).json({ message: 'Course code is required' });
    }

    
    const deletedEnrollment = await Enrollment.findOneAndDelete({ 
      studentId: studentId, 
      courseCode: courseCode 
    });

    
    if (!deletedEnrollment) {
      return res.status(404).json({ message: 'You are not enrolled in this course' });
    }

    res.status(200).json({ 
      message: 'Successfully dropped the course',
      courseCode: courseCode 
    });
  } catch (error) {
    console.error('Error dropping course:', error);
    res.status(500).json({ message: 'Failed to drop course' });
  }
});


router.get("/debug/users", async (req, res) => {
  try {
    const users = await User.find({}, 'email firstName lastName role');
    res.json({ 
      message: "Users in database:",
      count: users.length,
      users: users 
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
});

// POST /api/student/submit-message - Send a message to admin/support
router.post("/submit-message", requireAuth, async (req, res) => {
  try {
    const { fullName, email, phone, subject, message } = req.body; // Get form data
    const studentId = req.user.id; // Get student ID from login

    // Step 1: Make sure all required fields are filled out
    if (!fullName || !email || !subject || !message) {
      return res.status(400).json({ message: 'Please fill out all required fields' });
    }

    // Step 2: Save the message to the database

    const newMessage = await Message.create({
      studentId: studentId,
      fullName: fullName,
      email: email,
      phone: phone || 'Not provided',
      subject: subject,
      message: message,
      status: 'new'
    });

    res.status(201).json({ 
      message: 'Message sent successfully!',
      messageId: newMessage._id 
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
});

// PUT /api/student/profile - Update student's personal information
router.put("/profile", requireAuth, async (req, res) => {
  try {
    const { email, phone, birthday, program } = req.body; // Get form data
    const studentId = req.user.id; // Get student ID from login

    
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const validPrograms = ['Diploma (2 Years)', 'Post-Diploma (1 Year)', 'Certificate (6 Months)', 'Bachelor (4 Years)'];
    if (program && !validPrograms.includes(program)) {
      return res.status(400).json({ message: 'Please choose a valid program' });
    }

    
    const updateData = {
      email: email.trim().toLowerCase(), // Clean up email format
      phone: phone || '',               // Use empty string if no phone
      birthday: birthday || '',         // Use empty string if no birthday
      program: program || 'Diploma (2 Years)' // Default program if none chosen
    };

    
    const updatedUser = await User.findByIdAndUpdate(
      studentId,         // Find this student
      updateData,        // Update with new data
      { new: true, runValidators: true } // Return updated record and validate
    ).select('-password'); // Don't include password in response

    
    if (!updatedUser) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ 
      message: 'Profile updated successfully',
      profile: {
        id: updatedUser._id,
        email: updatedUser.email,
        phone: updatedUser.phone || '',
        birthday: updatedUser.birthday || '',
        program: updatedUser.program || 'Diploma (2 Years)'
      }
    });
  } catch (error) {
    // If the email is already used by another student
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already in use by another student' });
    }
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
});

export default router;