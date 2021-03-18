module.exports = (sequelize, DataTypes) => {
  const University = sequelize.define("University", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //   country :{
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //   }
  });
  return University;
};
