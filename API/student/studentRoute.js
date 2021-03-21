const express = require("express");
const router = express.Router();
const upload = require("../../middlewear/multer");
const {
  getStudentsList,
  getStudentById,
  deleteStudent,
  addStudent,
  updateStudent,
} = require("./studentController");

// Get students list
router.get("/", getStudentsList);

// Get student by ID
router.get("/:studentId", getStudentById);

// Delete student
router.delete("/:studentId", deleteStudent);

// // Add student
// router.post("/", upload.single("image"), addStudent);

// Update student infrmation
router.put("/:studentId", upload.single("image"), updateStudent);

module.exports = router;
