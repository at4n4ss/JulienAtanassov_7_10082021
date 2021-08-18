'use strict';
module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define(
    'Comment',
    {
      contentComment: DataTypes.STRING
    },
    {
      classMethods: {
        associate: function (models) {
          // associations can be defined here

          models.Comment.belongsTo(models.User, {
            foreignKey: 'userId'
          });
          models.Comment.belongsTo(models.Content, {
            foreignKey: 'contentId'
          });
        }
      }
    }
  );
  return Comment;
};
