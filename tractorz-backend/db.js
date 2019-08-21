require('dotenv').config({path: 'mysql.env'});
const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected to MySQL");
  });

exports.getEmployees = function(callback) {
    db.query("SELECT *"
    + " FROM employee",
    function(err, rows) {
      if (err) throw err;
      callback(rows);
    });
};

exports.getEmployeeId = function(id, callback) {
    db.query("SELECT id"
    + " FROM employee WHERE employee_id = ?",
    [id],
    function(err, rows) {
      if (err) throw err;
      callback(rows);
    });
  }

exports.addEmployee = function(data, readyFn) {
    db.query("INSERT INTO employee SET ?", data,
      function(error, results, fields) {
          if (error) throw error;
          readyFn(data.employee_id);
      });
};