const express = require("express");
const router = express.Router();
const upload = require("../../middlewear/multer");
const {
  getUniversitiesList,
  getUniversityById,
  deleteUniversity,
  addUniversity,
  updateUniversity,
  addStudent,
  fetchUniversity,
} = require("./uniController");

// param middlewear
router.param("universityId", async (req, res, next, universityId) => {
  const university = await fetchUniversity(universityId, next);
  if (university) {
    req.university = university;
    next();
  } else {
    const err = new Error("University Not Found");
    err.status = 404;
    console.error(error);
    next(err);
  }
});

// Get universities list
router.get("/", getUniversitiesList);

// Get university by ID
router.get("/:universityId", getUniversityById);

// Delete university
router.delete("/:universityId", deleteUniversity);

// Add university
router.post("/", addUniversity);

// Update university infrmation
router.put("/:universityId", updateUniversity);

// Add student
router.post("/:universityId/students", upload.single("image"), addStudent);

module.exports = router;
