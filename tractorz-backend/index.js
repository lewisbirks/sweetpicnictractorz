const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

const db = require('./db.js');

// Error handling is very messy but I can't think how to make it nicer

////////////////////////////////////////////////////////////////////
///                        Employee                              ///
////////////////////////////////////////////////////////////////////

app.get('/employee', function (req, res) {
  db.getEmployees(function (employees) {
    res.send(employees);
  }, function (error) {
    console.log(error.code);
    console.log(error.sqlMessage);
    res.status(500).send({
      message: 'Database error. ' + error.sqlMessage
    });
  });
});

app.get('/employee/:id', function (req, res) {
  let id = req.params.id;
  db.getEmployeeById(id, function (rows) {
    res.send(rows[0]);
  }, function (error) {
    console.log(error.code);
    console.log(error.sqlMessage);
    res.status(500).send({
      message: 'Database error. ' + error.sqlMessage
    });
  })
});

app.post('/employee', function (req, res) {
  let body = req.body;
  if (!body.hasOwnProperty("commission_rate")) {
    console.log("Adding employee");
    addEmployee(body, res);
  } else {
    console.log("Adding sales employee");
    addSalesEmployee(body, res);
  }
});

function addEmployee(employee, res) {
  db.addEmployee(employee, function (employee_id) {
    db.getEmployeeById(employee_id, function (rows) {
      res.send(rows[0]);
    }, function (error) {
      console.log(error.code);
      console.log(error.sqlMessage);
      res.status(500).send({
        message: 'Database error. ' + error.sqlMessage
      });
    })
  }, function (error) {
    console.log(error.code);
    console.log(error.sqlMessage);
    res.status(500).send({
      message: 'Database error. ' + error.sqlMessage
    });
  })

}

////////////////////////////////////////////////////////////////////
///                       Department                             ///
////////////////////////////////////////////////////////////////////

app.get('/department', function (req, res) {
  db.getDepartments(function (departments) {
    res.send(departments);
  }, function (error) {
    console.log(error.code);
    console.log(error.sqlMessage);
    res.status(500).send({
      message: 'Database error. ' + error.sqlMessage
    });
  });
});

app.post('/department', function (req, res) {
  db.addDepartment(req.body, function (department_id) {
    db.getDepartmentById(department_id, function (rows) {
      res.send(rows[0]);
    }, function (error) {
      console.log(error.code);
      console.log(error.sqlMessage);
      res.status(500).send({
        message: 'Database error. ' + error.sqlMessage
      });
    })
  }, function (error) {
    console.log(error.code);
    console.log(error.sqlMessage);
    res.status(500).send({
      message: 'Database error. ' + error.sqlMessage
    });
  })
});

////////////////////////////////////////////////////////////////////
///                       Sales Employee                         ///
////////////////////////////////////////////////////////////////////

function addSalesEmployee(fullEmployee, res) {
  const employee = {
    employee_id: fullEmployee.employee_id,
    name: fullEmployee.name,
    address: fullEmployee.address,
    email: fullEmployee.email,
    nin: fullEmployee.nin,
    bank_number: fullEmployee.bank_number,
    bank_sort: fullEmployee.bank_sort,
    start_salary: fullEmployee.start_salary,
    salary: fullEmployee.salary,
    department_id: fullEmployee.department_id
  };

  const sales = {
    employee_id: fullEmployee.employee_id,
    commission_rate: fullEmployee.commission_rate,
  };

  db.addEmployee(employee, function () {
    db.addSalesEmployee(sales, function (employee_id) {
      db.getEmployeeById(employee_id, function (rows) {
        res.send(rows[0]);
      }, function (error) {
        console.log(error.code);
        console.log(error.sqlMessage);
        res.status(500).send({
          message: 'Database error. ' + error.sqlMessage
        });
      })
    }, function (error) {
      console.log(error.code);
      console.log(error.sqlMessage);
      res.status(500).send({
        message: 'Database error. ' + error.sqlMessage
      });
    })
  }, function (error) {
    console.log(error.code);
    console.log(error.sqlMessage);
    res.status(500).send({
      message: 'Database error. ' + error.sqlMessage
    });

  });
}

app.listen(8002, function () {
  console.log('express started on port 8002');
});


