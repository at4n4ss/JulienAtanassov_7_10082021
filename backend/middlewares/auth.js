// Imports
const jwt = require('jsonwebtoken');
const JWT_SIGN_SECRET =
  '4QDjD3s7hxYwaJGC3lTZtkswLsyuDzqSdJ9Sl5wH1uvL9IrchA7pODnvrBbWwcqt0w5nBpsDxUDqfjIxRBSH0dz2fepO6wHXDmVsBLrYKukXWK5W2X0JkczGKZUyX1XstFeA-avbi8YfmxluE0qc92bjwJhl6xMrYSHNXAmepvE';

// Création du token d'authentification
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, JWT_SIGN_SECRET);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
