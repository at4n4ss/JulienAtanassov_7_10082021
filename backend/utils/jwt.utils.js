// Imports
const jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET =
  '4QDjD3s7hxYwaJGC3lTZtkswLsyuDzqSdJ9Sl5wH1uvL9IrchA7pODnvrBbWwcqt0w5nBpsDxUDqfjIxRBSH0dz2fepO6wHXDmVsBLrYKukXWK5W2X0JkczGKZUyX1XstFeA-avbi8YfmxluE0qc92bjwJhl6xMrYSHNXAmepvE';

// Fonctions gérant l'authentification
module.exports = {
  generateTokenForUser: function (userData) {
    return jwt.sign(
      {
        userId: userData.id,
        isAdmin: userData.isAdmin
      },
      JWT_SIGN_SECRET,
      {
        expiresIn: '2h'
      }
    );
  },
  parseAuthorization: function (authorization) {
    return authorization != null ? authorization.replace('Bearer ', '') : null;
  },
  getUserId: function (authorization) {
    var userId = -1;
    var token = module.exports.parseAuthorization(authorization);
    if (token != null) {
      try {
        var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
        if (jwtToken != null) userId = jwtToken.userId;
      } catch (err) {}
    }
    return userId;
  }
};
