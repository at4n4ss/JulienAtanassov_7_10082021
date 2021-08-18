const models = require('../models');
const CONTENT_LIMIT = 100;
module.exports = {
  createComment: function (req, res) {
    // Params
    let contentId = req.body.contentId;
    let contentComment = req.body.contentComment;
    let userId = req.body.userId;
    console.log(userId);

    if (contentComment == null) {
      return res.status(400).json({ error: 'missing parameters' });
    }
    if (contentComment.lenght <= CONTENT_LIMIT) {
      return res.status(400).json({ error: 'invalid parameters' });
    }

    models.User.findOne({
      where: { id: userId }
    })
      .then(function (userFound) {
        if (userFound) {
          models.Comment.create({
            contentComment: contentComment,
            contentId: contentId,
            userId: userFound.id
          }).then(function (newComment) {
            if (newComment) {
              return res.status(201).json(newComment);
            } else {
              return res.status(500).json({ error: 'cannot post comment' });
            }
          });
        } else {
          res.status(404).json({ error: 'user not found' });
        }
      })
      .catch(function (err) {
        return res.status(500).json({
          error: 'unable to create comment'
        });
      });
  },
  displayComments: async function (req, res) {
    let contentId = req.body.contentId;
    console.log(contentId);
    try {
      const comments = await models.Comment.findAll({
        where: { contentId: contentId },
        attributes: ['id', 'contentComment', 'createdAt'],
        order: [['createdAt', 'ASC']],
        include: [
          {
            model: models.User,
            attributes: ['username', 'id']
          }
        ]
      });

      res.status(200).send(comments);
    } catch (error) {
      return res.status(500).send({
        error:
          'Une erreur est survenu lors de la récupération des commentaires '
      });
    }
  }
};
