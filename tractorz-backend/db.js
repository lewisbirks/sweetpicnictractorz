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

exports.getEmployees = function (callback, error) {
  db.query("SELECT *"
    + " FROM employee LEFT JOIN department USING(department_id) LEFT JOIN salesEmployee USING(employee_id)",
    function (err, rows) {
      if (err) {
        error(err);
        return;
      }
      callback(rows);
    });
};

exports.getEmployeeById = function (id, callback, error) {
  db.query("SELECT *"
    + " FROM employee LEFT JOIN department USING(department_id) LEFT JOIN salesEmployee USING(employee_id) WHERE employee_id = ?",
    [id],
    function (err, rows) {
      if (err) {
        error(err);
        return;
      }
      callback(rows);
    });
};

exports.getDepartmentById = function (id, callback, error) {
  db.query("SELECT *"
    + " FROM department WHERE department_id = ?",
    [id],
    function (err, rows) {
      if (err) {
        error(err);
        return;
      }
      callback(rows);
    });
};

exports.getDepartmentByName = function (name, callback, error) {
  db.query("SELECT department_id"
    + " FROM department WHERE department_name = ?",
    [name],
    function (err, rows) {
      if (err) {
        error(err);
        return;
      }
      callback(rows);
    });
}

exports.getDepartments = function (callback, error) {
  db.query("SELECT *"
    + " FROM department",
    function (err, rows) {
      if (err) {
        error(err);
        return;
      }
      callback(rows);
    });
};

exports.addEmployee = function (employee, readyFn, error) {
  db.query("INSERT INTO employee SET ?", employee,
    function (err, results, fields) {
      if (err) {
        error(err);
        return;
      }
      readyFn(employee.employee_id);
    });
};

exports.addSalesEmployee = function (salesEmployee, readyFn, error) {
  db.query("INSERT INTO salesEmployee SET ?", salesEmployee,
    function (err, results, fields) {
      if (err) {
        error(err);
        return;
      }
      readyFn(salesEmployee.employee_id);
    });
};

exports.addDepartment = function (department, readyFn, error) {
  db.query("INSERT INTO department SET ?", department,
    function (err, results, fields) {
      if (err) {
        error(err);
        return;
      }
      readyFn(results.insertId);
    });
};
