<<<<<<< HEAD
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
=======

module.exports = (sequelize, DataTypes) => {
 return sequelize.define("StudentCourses", {
  studentId: {
    type: DataTypes.INTEGER,
  },
  courseId: {
    type: DataTypes.INTEGER,
  },
});
>>>>>>> 57423555cd5636ed90495a3e75c5b513a78828b5
};
