const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');
const TITLE_LIMIT = 20;
const CONTENT_LIMIT = 100;
const ITEMS_LIMIT = 50;

// Routes
module.exports = {
  createContent: function (req, res) {
    // Getting auth header
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);
    // Params
    let title = req.body.title;
    let content = req.body.content;
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
          error: 'unable to verify user'
        });
      });
  },

  listContents: async function (req, res) {
    try {
      const posts = await models.Content.findAll({
        attributes: ['id', 'content', 'title', 'createdAt'],
        order: [['createdAt', 'ASC']],
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
  }
};
