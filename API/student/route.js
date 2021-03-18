const express = require("express");
const router = express.Router();

const {
  getStudentsList,
  getStudentById,
  deleteStudent,
  addStudent,
  updateStudent,
} = require("./controller");

// Get students list
router.get("/", getStudentsList);

// Get student by ID
router.get("/:studentId", getStudentById);

// Delete student
router.delete("/:studentId", deleteStudent);

// Add student
router.post("/", addStudent);

// Update student infrmation
router.put("/:studentId", updateStudent);

module.exports = router;
