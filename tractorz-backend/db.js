require('dotenv').config({path: 'mysql.env'});
const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});

db.connect(function (err) {
  if (err) {
    throw err;
  }
  console.log("Connected to MySQL");
});

exports.getEmployees = function (callback, error) {
  db.query("SELECT *"
      + " FROM employee",
      function (err, rows) {
        if (err) {
          error(err);
          return;
        }
        callback(rows);
      });
};

exports.getEmployeeId = function (id, callback, error) {
  db.query("SELECT *"
      + " FROM employee WHERE employee_id = ?",
      [id],
      function (err, rows) {
        if (err) {
          error(err);
          return;
        }
        callback(rows);
      });
};

exports.addEmployee = function (data, readyFn, error) {
  db.query("INSERT INTO employee SET ?", data,
      function (err, results, fields) {
        if (err) {
          error(err);
          return;
        }
        readyFn(data.employee_id);
      });
};
