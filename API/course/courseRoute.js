const express = require("express");
const router = express.Router();

const {
  getCoursesList,
  getCourseById,
  deleteCourse,
  addCourse,
  updateCourse,
  addStudentToCourse
  
} = require("./courseController");

// Get courses list
router.get("/", getCoursesList);


// Get course by ID
router.get("/:courseId", getCourseById);

// Delete course
router.delete("/:courseId", deleteCourse);

// Add course
router.post("/students/:studentId", addCourse);

// // Add Student to course
router.post("/:courseId/student/:studentId", addStudentToCourse);

// Update course infrmation
router.put("/:courseId", updateCourse);

module.exports = router;
