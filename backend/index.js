const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/apiRouter').router;
const app = express();
app.use(cors());
app.use(express.json());
// Body parser config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Connection à la base de donnée
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456Abc$',
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
