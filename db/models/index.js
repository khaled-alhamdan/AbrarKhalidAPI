"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const StudentCourses = require("./StudentCourses");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//one to many relationship
db.University.hasMany(db.Student, {
  foreignKey: "universityId",
  as: "Students Names and Ids",
  allowNull: false,
});
db.Student.belongsTo(db.University, {
  as: "University Name",
  foreignKey: "universityId",
});

//many to many relationship
db.Student.belongsToMany(db.Course , { 
  through: db.StudentCourses,
  as: "courses",
  foreignKey: "studentId",
});
db.Course.belongsToMany(db.Student, { 
  through: db.StudentCourses,
  as: "students",
  foreignKey: "courseId",

});

module.exports = db;