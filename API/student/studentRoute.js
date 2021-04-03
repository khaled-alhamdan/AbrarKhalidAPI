const express = require("express");
const router = express.Router();
const upload = require("../../middlewear/multer");
const {
  getStudentsList,
  getStudentById,
  deleteStudent,
  fetchStudent,
  updateStudent,
  addStudent,
} = require("./studentController");

// param middlewear
router.param("studentId", async (req, res, next, studentId) => {
  const student = await fetchStudent(studentId, next);
  if (student) {
    req.student = student;
    next();
  } else {
    const err = new Error("Student Not Found");
    err.status = 404;
    console.error(error);
    next(err);
  }
});

// Get students list
router.get("/", getStudentsList);

// Get student by ID
router.get("/:studentId", getStudentById);

// Delete student
router.delete("/:studentId", deleteStudent);

// Add student
router.post("/", upload.single("image"), addStudent);

// Update student infrmation
router.put("/:studentId", upload.single("image"), updateStudent);

module.exports = router;
