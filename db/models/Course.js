module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define("Course", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    instructor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Course;
};
