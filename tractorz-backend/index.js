const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const db = require('./db.js');

function handleError(err, req, res) {
  if (err.errno === 3819) err.code = "ER_CHECK_CONSTRAINT_VIOLATED";
  console.error(`${err.errno} (${err.code}) : ${err.sqlMessage}`);
  res.status(500).send({
    message: 'Database error. ' + err.sqlMessage
  });
}

////////////////////////////////////////////////////////////////////
///                        Employee                              ///
////////////////////////////////////////////////////////////////////

app.get('/employee', (req, res) => {
  db.getEmployees((err, rows) => {
    if (err) return handleError(err, req, res);
    res.send(rows);
  });
});

app.get('/employee/:id', (req, res) => {
  const id = req.params.id;
  db.getEmployeeById(id, (err, rows) => {
    if (err) return handleError(err, req, res);
    res.send(rows[0]);
  });
});

app.post('/employee', (req, res) => {
  if (req.body.commission_rate) {
    console.log("Adding sales employee");
    addSalesEmployee(req, res);
  } else {
    console.log("Adding employee");
    addEmployee(req, res);
  }
});

function addEmployee(req, res) {
  const employee = {
    employee_id: req.body.employee_id,
    name: req.body.name,
    address: req.body.address,
    email: req.body.email,
    nin: req.body.nin,
    bank_number: req.body.bank_number,
    bank_sort: req.body.bank_sort,
    start_salary: req.body.start_salary,
    salary: req.body.salary,
    department_id: req.body.department_id
  };
  db.addEmployee(employee, (err, insertedId) => {
    if (err) return handleError(err, req, res);
    db.getEmployeeById(insertedId, (err, rows) => {
      if (err) return handleError(err, req, res);
      res.send(rows[0]);
    })
  });
}

////////////////////////////////////////////////////////////////////
///                       Department                             ///
////////////////////////////////////////////////////////////////////

app.get('/department', (req, res) => {
  db.getDepartments((err, rows) => {
    if (err) return handleError(err, req, res);
    res.send(rows);
  });
});

app.post('/department', (req, res) => {
  db.addDepartment(req.body, (err, insertedId) => {
    if (err) return handleError(err, req, res);
    db.getDepartmentById(insertedId, (err, rows) => {
      if (err) return handleError(err, req, res);
      res.send(rows[0]);
    });
  });
});

////////////////////////////////////////////////////////////////////
///                       Sales Employee                         ///
////////////////////////////////////////////////////////////////////

function addSalesEmployee(req, res) {
  const employee = {
    employee_id: req.body.employee_id,
    name: req.body.name,
    address: req.body.address,
    email: req.body.email,
    nin: req.body.nin,
    bank_number: req.body.bank_number,
    bank_sort: req.body.bank_sort,
    start_salary: req.body.start_salary,
    salary: req.body.salary,
    department_id: req.body.department_id
  };

  const sales = {
    employee_id: req.body.employee_id,
    commission_rate: req.body.commission_rate,
  };

  db.addEmployee(employee, (err, insertedId) => {
    if (err) return handleError(err, req, res);

    db.addSalesEmployee(sales, (err, insertedId) => {
      if (err) return handleError(err, req, res);

      db.getEmployeeById(insertedId, (err, rows) => {
        if (err) return handleError(err, req, res);
        res.send(rows[0]);
      });
    });
  });
}

app.listen(8002, function () {
  console.log('express started on port 8002');
});


