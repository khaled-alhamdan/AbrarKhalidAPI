const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const StudentCourses = sequelize.define("StudentCourses", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      uniqe: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  SequelizeSlugify.slugifyModel(StudentCourses, {
    source: ["name"],
  });

  return StudentCourses;
};
