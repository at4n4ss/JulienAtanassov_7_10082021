const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');
// RegEx
const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;
// Routes
module.exports = {
  register: function (req, res) {
    // Params
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    if (email == null || username == null || password == null) {
      return res.status(400).json({ error: 'missing parameters' });
    }

    if (username.lenght >= 13 || username.lenght <= 2) {
      return res.status(400).json({
        error: 'wrong username(Votre pseudo doit contenir entre 3 et 12 lettres'
      });
    }
    // Vérification des input
    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ error: 'email invalide' });
    }
    if (!PASSWORD_REGEX.test(password)) {
      return res.status(400).json({
        error:
          'Le mot de passe doit avoir entre 4 et 8 lettres et contenir au moins 1 chiffre '
      });
    }

    models.User.findOne({
      attributes: ['email'],
      where: { email: email }
    })
      .then(function (userFound) {
        if (!userFound) {
          bcrypt.hash(password, 5, function (err, bcryptedPassword) {
            var newUser = models.User.create({
              email: email,
              username: username,
              password: bcryptedPassword,
              isAdmin: 0
            })
              .then(function (newUser) {
                return res.status(201).json({
                  userId: newUser.id
                });
              })
              .catch(function (err) {
                return res
                  .status(500)
                  .json({ error: 'Impossible d ajouter l utilisateur' });
              });
          });
        } else {
          return res.status(409).json({ error: 'Cet utilisateur existe déjà' });
        }
      })
      .catch(function (err) {
        return res.status(500).json({ error: 'unable to verify user' });
      });
  },
  login: function (req, res) {
    // Params
    var email = req.body.email;
    var password = req.body.password;

    if (email == null || password == null) {
      return res.status(400).json({ error: 'missing parameters' });
    }
    // TODO verify email regex / password

    models.User.findOne({
      where: { email: email }
    })
      .then(function (userFound) {
        if (userFound) {
          bcrypt.compare(
            password,
            userFound.password,
            function (errBycrypt, resBycrypt) {
              if (resBycrypt) {
                return res.status(200).json({
                  userId: userFound.id,
                  token: jwtUtils.generateTokenForUser(userFound)
                });
              } else {
                return res.status(403).json({ error: 'mot de passe invalide' });
              }
            }
          );
        } else {
          return res.status(404).json({ error: 'utilisateur n existe pas' });
        }
      })
      .catch(function (err) {
        return res
          .status(500)
          .json({ error: 'impossible de vérifier utilisateur' });
      });
  },
  getUserProfile: function (req, res) {
    // Getting auth header
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0) return res.status(400).json({ error: 'wrong token' });

    models.User.findOne({
      attributes: ['id', 'email', 'username', 'bio'],
      where: { id: userId }
    })
      .then(function (user) {
        if (user) {
          res.status(201).json(user);
        } else {
          res.status(404).json({ error: 'user not found' });
        }
      })
      .catch(function (err) {
        res.status(500).json({ error: 'cannot fetch user' });
      });
  },
  updateUserProfile: function (req, res) {
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);
    // Params
    var bio = req.body.bio;
    models.User.findOne({
      attributes: ['id', 'bio'],
      where: { id: userId }
    }).then(function (userFound) {
      if (userFound) {
        userFound
          .update({
            bio: bio ? bio : userFound.bio
          })
          .then(function () {
            res.status(200).json({ message: 'User modified' });
          })
          .catch(function (err) {
            res.status(500).json({ error: 'cannot update user' });
          });
      } else {
        res.status(404).json({ error: 'user not found' });
      }
    });
  }
};
