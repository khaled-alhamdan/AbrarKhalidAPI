const { Student, University, Course } = require("../../db/models");

exports.fetchStudent = async (studentId, next) => {
  try {
    const student = await Student.findByPk(studentId);
    return student;
  } catch (error) {
    next(error);
  }
};

// Get the students list
exports.getStudentsList = async (req, res, next) => {
  try {
    const students = await Student.findAll({
      attributes: { exclude: ["UniversityId", "createdAt", "updatedAt"] },
      include: [
        {
          model: University,
          as: "University Name",
          attributes: ["name"],
        },
        {
          model: Course,
          as: "courses",
          attributes: ["id"],
        },
      ],
    });
    res.status(200).json(students);
  } catch (error) {
    next(error);
  }
};

// Get the student by his ID
exports.getStudentById = async (req, res, next) => {
  const { studentId } = req.params;

  try {
    const foundStudent = await Student.findByPk(studentId, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: University,
          as: "University Name",
          attributes: ["name"],
        },
        {
          model: Course,
          as: "courses",
          attributes: ["id", "name"],
        },
      ],
    });
    res.status(200).json(foundStudent);
  } catch (error) {
    const err = new Error("Student Not Found");
    err.status = 404;
    next(err);
  }
};

// Add student
exports.addStudent = async (req, res, next) => {
  try {
    const newStudent = await Student.create(req.body);

    res.status(201).json(newStudent);
  } catch (error) {
    next(error);
  }
};

// Delete the student
exports.deleteStudent = async (req, res, next) => {
  try {
    await req.student.destroy(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

// Update student information
exports.updateStudent = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/Images/${
        req.file.filename
      }`;
    }
    await req.student.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
