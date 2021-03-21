const { University } = require("../../db/models");
const { Student } = require("../../db/models");

// Get the universities list
exports.getUniversitiesList = async (req, res) => {
  try {
    const university = await University.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (university) {
      res.status(200).json(university);
    } else {
      res.status(404).json({ message: " No universities found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Inernal servier error" });
  }
};

// Get the university by his ID
exports.getUniversityById = async (req, res) => {
  const { universityId } = req.params;

  try {
    const foundUniversity = await University.findByPk(universityId, {
      attributes: { exclude: ["createdAt", "updatedAt"] }, // exclude these only
    });
    if (foundUniversity) {
      res.status(200).json(foundUniversity);
    } else {
      res.status(404).json({ message: " The university was not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Inernal servier error" });
  }
};

// Delete the university
exports.deleteUniversity = async (req, res) => {
  const { universityId } = req.params;

  try {
    const foundUniversity = await University.findByPk(universityId);
    if (foundUniversity) {
      await foundUniversity.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: " The university was not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Inernal servier error" });
  }
};

// Add university
exports.addUniversity = async (req, res) => {
  try {
    const newUniversity = await University.create(req.body);
    if (newUniversity) {
      res.status(201).json(newUniversity);
    } else {
      res.status(406).json({ error: "new university could not be added" });
    }
  } catch (error) {
    res.status(500).json({ error: "Inernal servier error" });
  }
};

// Update university information
exports.updateUniversity = async (req, res) => {
  const { universityId } = req.params;
  try {
    const updatedUniversity = await University.findByPk(universityId);
    if (updatedUniversity) {
      await updatedUniversity.update(req.body);
      res.status(204).end();
    } else {
      res.status(406).json({ error: "university could not be updated" });
    }
  } catch (error) {
    res.status(500).json({ error: "Inernal servier error" });
  }
};

// Add student
exports.addStudent = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/Images/${
        req.file.filename
      }`;
    }
    req.body.universityId = req.university.id;
    const newStudent = await Student.create(req.body);
    if (newStudent) {
      res.status(201).json(newStudent);
    } else {
      res.status(406).json({ error: "new student could not be added" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Inernal servier error" });
  }
};
