// Imports
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/apiRouter').router;
const app = express();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// express rate Limiter security
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000 // limit each IP to 1000 requests per windowMs
});
app.use(limiter);
// Cors
app.use(cors());
// App express
app.use(express.json());
// Helmet security
app.use(helmet());
// Body parser config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Connection à la base de donnée
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  port: 3306,
  database: 'groupomania'
});
connection.connect(err => {
  if (err) {
    console.log('Erreur connection');
  } else {
    console.log('Connected!');
  }
});
// Démarrage du serveur
app.listen('3002', () => {
  console.log('Server listening on port 3002');
});

// Routes
app.use('/api/', apiRouter);
