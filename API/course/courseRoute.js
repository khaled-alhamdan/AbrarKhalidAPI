const express = require("express");
const router = express.Router();

const {
  getCoursesList,
  getCourseById,
  deleteCourse,
  addCourse,
  updateCourse,
<<<<<<< HEAD
  // addStudent,
=======
  addStudentToCourse
  
>>>>>>> 57423555cd5636ed90495a3e75c5b513a78828b5
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

// Add course
// router.post("/:courseId/students", addStudent);

module.exports = router;
