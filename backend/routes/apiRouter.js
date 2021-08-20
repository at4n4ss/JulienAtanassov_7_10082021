// Imports
const express = require('express');
const usersCtrl = require('../controllers/userCtrl');
const contentCtrl = require('../controllers/contentCtrl');
const auth = require('../middlewares/auth');
const commentCtrl = require('../controllers/commentCtrl');

// Création du routeur express
exports.router = (function () {
  const apiRouter = express.Router();

  // Routes des utilisateurs
  apiRouter.route('/users/register/').post(usersCtrl.register);
  apiRouter.route('/users/login/').post(usersCtrl.login);
  apiRouter.route('/users/me/').post(auth, usersCtrl.getUserProfile);
  apiRouter.route('/users/me/').put(auth, usersCtrl.updateUserProfile);
  apiRouter.route('/users/me/delete').post(auth, usersCtrl.deleteUserProfile);
  // Routes  des articles
  apiRouter.route('/content/new/').post(contentCtrl.createContent);
  apiRouter.route('/content/').get(auth, contentCtrl.listContents);
  apiRouter.route('/content/me/').post(auth, contentCtrl.listUserContents);
  apiRouter
    .route('/content/me/delete/')
    .post(auth, contentCtrl.deleteUserContent);
  apiRouter.route('/content/id').post(auth, contentCtrl.getContentById);

  // Routes des commentaires
  apiRouter.route('/comment/new').post(auth, commentCtrl.createComment);
  apiRouter.route('/comment/').post(auth, commentCtrl.displayComments);
  apiRouter.route('/comment/all').get(auth, commentCtrl.listComments);
  apiRouter.route('/comment/me').post(auth, commentCtrl.displayUserComments);
  apiRouter
    .route('/comment/me/delete')
    .post(auth, commentCtrl.deleteUserComment);
  return apiRouter;
})();
