const express = require("express");
const router = express.Router();

const {
  getCoursesList,
  getCourseById,
  deleteCourse,
  addCourse,
  updateCourse,
  // addStudent,
} = require("./courseController");

// Get courses list
router.get("/", getCoursesList);

// Get course by ID
router.get("/:courseId", getCourseById);

// Delete course
router.delete("/:courseId", deleteCourse);

// Add course
router.post("/", addCourse);

// Update course infrmation
router.put("/:courseId", updateCourse);

// Add course
// router.post("/:courseId/students", addStudent);

module.exports = router;
