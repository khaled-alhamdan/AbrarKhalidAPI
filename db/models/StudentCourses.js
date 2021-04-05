module.exports = (sequelize, DataTypes) => {
  const StudentCourses = sequelize.define("StudentCourses", {
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return StudentCourses;
};
