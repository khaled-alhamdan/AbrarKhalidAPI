const { University, Student , Course } = require("../../db/models");

// get/fetch University
exports.fetchUniversity = async (universityId, next) => {
  try {
    const university = await University.findByPk(universityId);
    return university;
  } catch (error) {
    next(error);
  }
};

// Get the universities list
exports.getUniversitiesList = async (req, res, next) => {
  try {
    const university = await University.findAll({
      attributes: ["id", "name", "country"],
      include: {
        model: Student,
        as: "Students Names and Ids",
        attributes: ["id","name"],
      },
    });
    res.status(200).json(university);
  } catch (error) {
    next(error);
  }
};

// Get the university by his ID
exports.getUniversityById = async (req, res, next) => {
  const { universityId } = req.params;

  try {
    const foundUniversity = await University.findByPk(universityId, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Student,
        as: "Students Names and Ids",
        attributes: ["id", "name"],
      }, // exclude these only
    });
    res.status(201).json(foundUniversity);
  } catch (error) {
    const err = new Error("University Not Found");
    err.status = 404;
    next(err);
  }

  // try {
  //   await req.university(req.params);
  //   res.status(204).json(university);
  // } catch (error) {
  //   next(error);
  // }
};

// Delete the university
exports.deleteUniversity = async (req, res, next) => {
  try {
    await req.university.destroy(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

// Add university
exports.addUniversity = async (req, res, next) => {
  try {
    const newUniversity = await University.create(req.body);

    res.status(201).json(newUniversity);
  } catch (error) {
    next(error);
  }
};

// Update university information
exports.updateUniversity = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/Images/${
        req.file.filename
      }`;
    }
    await req.university.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

// Add student
exports.addStudent = async (req, res, next) => {
  // const { courseId } =req.params;
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/Images/${
        req.file.filename
      }`;
    }
    req.body.universityId = req.university.id;
    const newStudent = await Student.create(req.body);
    // const course = await Course.findByPk(courseId);
    // newStudent.addCourse(course);
    res.status(201).json(newStudent);
  } catch (error) {
    next(error);
  }
};

exports.addCourseToStudent = async (req,res,next) => {
  const { courseId } = req.params;
  const { studentId } = req.params;

  try {
    const course = await Course.findByPk(courseId);
    const student = await Student.findByPk(studentId);
    student.addCourse(course);
    res.status(201).json(course);
  } catch (error) {
    next(error);
  }
}


