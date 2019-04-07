const express = require('express');
const bodyParser = require('body-parser');
const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456789',
  database : 'pp-rbh'
});

const app = express();

app.get('/dt_detailmanagement.json', function (req, res) {
    connection.connect();

    connection.query('SELECT * FROM dt_detailmanagement', function (error, results, fields) {
      if (error) throw error;
      res.send(results)
    });
});
app.get('/dt_management.json', function (req, res) {
  connection.connect();

  connection.query('SELECT * FROM dt_management', function (error, results, fields) {
    if (error) throw error;
    res.send(results)
  });
});
app.get('/authorities.json', function (req, res) {
  connection.connect();

  connection.query('SELECT * FROM authorities', function (error, results, fields) {
    if (error) throw error;
    res.send(results)
  });
});
// Start the server
app.listen(3000, () => {
 console.log('Go to http://localhost:3000/posts to see posts');
});