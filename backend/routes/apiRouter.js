const express = require('express');
const usersCtrl = require('../controllers/userCtrl');
const contentCtrl = require('../controllers/contentCtrl');
const auth = require('../middlewares/auth');
// Router
exports.router = (function () {
  const apiRouter = express.Router();

  // Users routes
  apiRouter.route('/users/register/').post(usersCtrl.register);
  apiRouter.route('/users/login/').post(usersCtrl.login);
  apiRouter.route('/users/me/').post(auth, usersCtrl.getUserProfile);
  apiRouter.route('/users/me/').put(auth, usersCtrl.updateUserProfile);

  // Content routes
  apiRouter.route('/content/new/').post(contentCtrl.createContent);
  apiRouter.route('/content/').get(auth, contentCtrl.listContents);
  apiRouter.route('/content/me').post(auth, contentCtrl.listUserContents);

  return apiRouter;
})();
