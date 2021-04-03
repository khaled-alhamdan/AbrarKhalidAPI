const { Course, Student, University } = require("../../db/models");

// Get the courses list
exports.getCoursesList = async (req, res, next) => {
  try {
    const course = await Course.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Student,
          as: "students",
          attributes: ["id", "name"],
        },
        {
          model: University,
          as: "University Name",
          attributes: ["id", "name"],
        },
      ],
    });

    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

// Get the course by his ID
exports.getCourseById = async (req, res, next) => {
  const { courseId } = req.params;

  try {
    const foundCourse = await Course.findByPk(courseId, {
      attributes: { exclude: ["createdAt", "updatedAt"] }, // exclude these only
      include: {
        model: Student,
        as: "students",
        attributes: ["id"],
      },
    });
    if (foundCourse) {
      res.status(200).json(foundCourse);
    } else {
      res.status(404).json({ message: " The course was not found" });
    }
  } catch (error) {
    const err = new Error("Course Not Found");
    err.status = 404;
    next(err);
  }
};

// Delete the course
exports.deleteCourse = async (req, res, next) => {
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
    const err = new Error("Course Not Found");
    err.status = 404;
    next(err);
  }
};

// Add course
exports.addCourse = async (req, res, next) => {
  const { studentId } = req.params;

  try {
    const newCourse = await Course.create(req.body);
    // const newStudentCourse = await StudentCourses.create(studentCourses);
    const student = await Student.findByPk(studentId);
    newCourse.addStudent(student);
    res.status(201).json(newCourse);
  } catch (error) {
    next(error);
  }
};

//add student to course
exports.addStudentToCourse = async (req, res, next) => {
  const { courseId } = req.params;
  const { studentId } = req.params;

  try {
    const course = await Course.findByPk(courseId);
    const student = await Student.findByPk(studentId);
    course.addStudent(student);
    res.status(201).json(student);
  } catch (error) {
    next(error);
  }
};

//Update course information
exports.updateCourse = async (req, res, next) => {
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
    const err = new Error("Course Not Found");
    err.status = 404;
    next(err);
  }
};
