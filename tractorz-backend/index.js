const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

const db = require('./db.js');

employees = [];

app.get('/employee', function (req, res) {
  try {
    db.getEmployees(function (employees) {
      res.send(employees);
    });
  } catch (err) {
    res.status(500).send({
      message: 'Database error'
    });
  }
});

app.get('/employee/:id', function (req, res) {
  let id = req.params.id;
  try {
    db.getEmployeeId(id, function (employee) {
      res.send(employee);
    })
  } catch (e) {
    res.status(500).send({
      message: 'Database error'
    });
  }
});

app.post('/employee', function (req, res) {
  db.addEmployee(req.body, function (employee_id) {
    db.getEmployeeId(employee_id, function (employee) {
      res.send(employee);
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

app.listen(8002, function () {
  console.log('express started on port 8002');
});


