require('dotenv').config({ path: 'mysql.env' });
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

exports.getEmployees = function (callback) {
  db.query("SELECT *"
    + " FROM employee LEFT JOIN department USING(department_id) LEFT JOIN salesEmployee USING(employee_id)",
    function (err, rows) {
      if (err) return callback(err, null);
      callback(null, rows);
    });
};

exports.getEmployeeById = function (id, callback) {
  db.query("SELECT *"
    + " FROM employee LEFT JOIN department USING(department_id) LEFT JOIN salesEmployee USING(employee_id) WHERE employee_id = ?",
    [id],
    function (err, rows) {
      if (err) return callback(err, null);
      callback(null, rows);
    });
};

exports.getDepartmentById = function (id, callback) {
  db.query("SELECT *"
    + " FROM department WHERE department_id = ?",
    [id],
    function (err, rows) {
      if (err) return callback(err, null);
      callback(null, rows);
    });
};

exports.getDepartmentByName = function (name, callback) {
  db.query("SELECT department_id"
    + " FROM department WHERE department_name = ?",
    [name],
    function (err, rows) {
      if (err) return callback(err, null);
      callback(null, rows);
    });
}

exports.getDepartments = function (callback) {
  db.query("SELECT *"
    + " FROM department",
    function (err, rows) {
      if (err) return callback(err, null);
      callback(null, rows);
    });
};

exports.addEmployee = function (employee, callback) {
  db.query("INSERT INTO employee SET ?", employee,
  function (err, results, fields) {
    if (err) return callback(err, null);
    callback(null, employee.employee_id);
  });
};

exports.addSalesEmployee = function (salesEmployee, callback) {
  db.query("INSERT INTO salesEmployee SET ?", salesEmployee,
  function (err, results, fields) {
    if (err) return callback(err, null);
    callback(null, salesEmployee.employee_id);
  });
};

exports.addDepartment = function (department, callback) {
  db.query("INSERT INTO department SET ?", department,
    function (err, results, fields) {
      if (err) return callback(err, null);
      callback(null, results.insertId);
    });
};
