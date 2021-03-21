const { University, Student } = require("../../db/models");

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
      attributes: ["id", "name"],
      include: {
        model: Student,
        as: "students",
        attributes: ["name"],
      },
    });
    if (university) {
      res.status(200).json(university);
    } else {
      res.status(404).json({ message: " No universities found" });
    }
  } catch (error) {
    next(error);
  }
};

// Get the university by his ID
exports.getUniversityById = async (req, res, next) => {
  const { universityId } = req.params;

  try {
    const foundUniversity = await University.findByPk(universityId, {
      attributes: { exclude: ["createdAt", "updatedAt"] }, // exclude these only
    });
    res.status(201).json(foundUniversity);
  } catch (error) {
    const err = new Error("University Not Found");
    err.status = 404;
    next(err);
  }
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
    if (newUniversity) {
      res.status(201).json(newUniversity);
    } else {
      res.status(406).json({ error: "new university could not be added" });
    }
  } catch (error) {
    next(error);
  }
};

// Update university information
exports.updateUniversity = async (req, res, next) => {
  try {
    await req.university.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

// Add student
exports.addStudent = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/Images/${
        req.file.filename
      }`;
    }
    req.body.universityId = req.university.id;
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    next(error);
  }
};
