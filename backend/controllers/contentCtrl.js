const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');
const TITLE_LIMIT = 20;
const CONTENT_LIMIT = 100;
const ITEMS_LIMIT = 50;

// Fonctions controllant les articles
module.exports = {
  createContent: function (req, res) {
    // Params
    let title = req.body.title;
    let content = req.body.content;
    let userId = req.body.userId;
    if (title == null || content == null) {
      return res.status(400).json({ error: 'missing parameters' });
    }
    if (title.lenght <= TITLE_LIMIT || content.lenght <= CONTENT_LIMIT) {
      return res.status(400).json({ error: 'invalid parameters' });
    }

    models.User.findOne({
      where: { id: userId }
    })
      .then(function (userFound) {
        if (userFound) {
          models.Content.create({
            title: title,
            content: content,
            likes: 0,
            UserId: userFound.id
          }).then(function (newContent) {
            if (newContent) {
              return res.status(201).json(newContent);
            } else {
              return res.status(500).json({ error: 'cannot post content' });
            }
          });
        } else {
          res.status(404).json({ error: 'user not found' });
        }
      })
      .catch(function (err) {
        return res.status(500).json({
          error: 'unable to create content'
        });
      });
  },
  // Afficher tous les articles
  listContents: async function (req, res) {
    try {
      const posts = await models.Content.findAll({
        attributes: ['id', 'content', 'title', 'createdAt'],
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
        error: 'Une erreur est survenu lors de la récupération des posts '
      });
    }
  },
  // Afficher les articles de l'utilisateur
  listUserContents: async function (req, res) {
    let userId = req.body.dataUser;
    try {
      const posts = await models.Content.findAll({
        where: { userId: userId },
        attributes: ['id', 'content', 'title', 'createdAt'],
        order: [['createdAt', 'DESC']],
        include: [
          {
            model: models.User,
            attributes: ['username', 'id']
          }
        ]
      });

      res.status(200).send(posts);
    } catch (error) {
      return res.status(500).send({
        error: 'Une erreur est survenu lors de la récupération des posts '
      });
    }
  },
  deleteUserContent: function (req, res) {
    let contentId = req.body.contentId;

    models.Content.destroy({ where: { id: contentId } });
    models.Comment.destroy({ where: { contentId: contentId } });

    res
      .status(200)
      .json({ res: 'post deleted' })
      .catch(err)
      .json({ error: 'cannot delete content' });
  },
  getContentById: async function (req, res) {
    let contentId = req.body.contentId;
    try {
      const post = await models.Content.findOne({
        where: { id: contentId },
        attributes: ['id', 'content', 'title', 'createdAt'],
        include: [
          {
            model: models.User,
            attributes: ['username', 'id']
          }
        ]
      });

      res.status(200).send(post);
    } catch (error) {
      return res.status(500).send({
        error: 'Une erreur est survenu lors de la récupération du post '
      });
    }
  }
};
