const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

const db = require('./db.js');

employees = [];

app.get('/employee', function (req, res) {
  db.getEmployees(function (employees) {
    res.send(employees);
  });
});


app.get('/employee/:id', function (req, res) {
  let id = req.params.id;
  db.getEmployeeId(id, function (employee) {
    res.send(employee);
  })
});

app.post('/employee', function (req, res) {
  db.addEmployee(req.body, function (employee_id) {
    db.getEmployeeId(employee_id, function (employee) {
      res.send(employee);
    })
  })
});

app.listen(8002, function () {
  console.log('express started on port 8002');
});


