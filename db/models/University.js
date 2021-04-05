const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const University = sequelize.define("University", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      uniqe: true,
    },
    image: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
<<<<<<< HEAD
    description: {
      type: DataTypes.STRING,
      // allowNull: false,
=======
    image: {
      type: DataTypes.STRING,
>>>>>>> 57423555cd5636ed90495a3e75c5b513a78828b5
    },
  });
  SequelizeSlugify.slugifyModel(University, {
    source: ["name"],
  });

  return University;
};
