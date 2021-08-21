const models = require('../models');
const CONTENT_LIMIT = 100;

// Fonctions controllant les commentaires
module.exports = {
  // Permet de creer un commentaire
  createComment: function (req, res) {
    // Params
    let contentId = req.body.contentId;
    let contentComment = req.body.contentComment;
    let userId = req.body.userData;
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
  // Affiche les commentaires d'un article
  displayComments: async function (req, res) {
    let contentId = req.body.contentId;

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
  },
  // Renvoi les commentaires de l'utilisateur
  displayUserComments: async function (req, res) {
    let userId = req.body.userData;

    try {
      const comments = await models.Comment.findAll({
        where: { userId: userId },
        attributes: ['id', 'contentComment', 'createdAt'],
        order: [['createdAt', 'DESC']],
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
  },
  // Supprimer le commentaire
  deleteUserComment: function (req, res) {
    let commentId = req.body.commentId;

    models.Comment.destroy({ where: { id: commentId } });

    res
      .status(200)
      .json({ res: 'comment deleted' })
      .catch(err)
      .json({ error: 'cannot delete comment' });
  },
  // Afficher tous les commentaires
  listComments: async function (req, res) {
    try {
      const posts = await models.Comment.findAll({
        attributes: ['id', 'contentComment', 'createdAt'],
        order: [['createdAt', 'DESC']],
        include: [
          {
            model: models.User,
            attributes: ['username', 'id']
          }
        ]
      });
      console.log(posts);
      res.status(200).send(posts);
    } catch (error) {
      return res.status(500).send({
        error:
          'Une erreur est survenu lors de la récupération des commentaires '
      });
    }
  },
  deleteContentComments: function (req, res) {
    let contentId = req.body.contentId;
    models.Comment.destroy({ where: { contentId: contentId } });
    res
      .status(200)
      .json({ res: 'comments deleted' })
      .catch(err)
      .json({ error: 'cannot delete comments' });
  }
};
