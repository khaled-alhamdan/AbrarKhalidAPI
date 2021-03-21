const { Course } = require("../../db/models");

// Get the courses list
exports.getCoursesList = async (req, res) => {
  try {
    const course = await Course.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (course) {
      res.status(200).json(course);
    } else {
      res.status(404).json({ message: " No courses found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Inernal servier error" });
  }
};

// Get the course by his ID
exports.getCourseById = async (req, res) => {
  const { courseId } = req.params;

  try {
    const foundCourse = await Course.findByPk(courseId, {
      attributes: { exclude: ["createdAt", "updatedAt"] }, // exclude these only
    });
    if (foundCourse) {
      res.status(200).json(foundCourse);
    } else {
      res.status(404).json({ message: " The course was not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Inernal servier error" });
  }
};

// Delete the course
exports.deleteCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    const foundCourse = await Course.findByPk(courseId);
    if (foundCourse) {
      await foundCourse.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: " The course was not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Inernal servier error" });
  }
};

// Add course
exports.addCourse = async (req, res) => {
  try {
    const newCourse = await Course.create(req.body);
    if (newCourse) {
      res.status(201).json(newCourse);
    } else {
      res.status(406).json({ error: "new course could not be added" });
    }
  } catch (error) {
    res.status(500).json({ error: "Inernal servier error" });
  }
};

// Update course information
exports.updateCourse = async (req, res) => {
  const { courseId } = req.params;
  try {
    const updatedCourse = await Course.findByPk(courseId);
    if (updatedCourse) {
      await updatedCourse.update(req.body);
      res.status(204).end();
    } else {
      res.status(406).json({ error: "course could not be updated" });
    }
  } catch (error) {
    res.status(500).json({ error: "Inernal servier error" });
  }
};
