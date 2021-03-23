
module.exports = (sequelize, DataTypes) => {
 return sequelize.define("StudentCourses", {
  studentId: {
    type: DataTypes.INTEGER,
  },
  courseId: {
    type: DataTypes.INTEGER,
  },
});
};
