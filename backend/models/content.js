'use strict';
module.exports = (sequelize, DataTypes) => {
  var Content = sequelize.define(
    'Content',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      attachment: DataTypes.STRING,
      likes: DataTypes.INTEGER
    },
    {
      classMethods: {
        associate: function (models) {
          // associations can be defined here

          models.Content.belongsTo(models.User, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    }
  );
  return Content;
};
