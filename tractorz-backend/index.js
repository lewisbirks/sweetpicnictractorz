const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

const db = require('./db.js');

employees = [];

function updateEmployees(ready) {
  db.getEmployees(function (rows) {
        this.employees = rows;
        ready();
      }
  )
}

app.get('/employee', function (req, res) {
  updateEmployees(function () {
    res.send(employees);
  });
});

app.post('/employee', function (req, res) {
  db.addEmployee(req.body, function (employee_id) {
    updateEmployees(function () {
      db.getEmployeeId(employee_id, function (employee) {
        res.send(employee);
      })
    })
  })
});

app.listen(8002, function () {
  console.log('express started on port 8002');
});


