const express = require('express');
const app = express();

app.use(express.json());

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

app.listen(8002, function () {
  console.log('express started on port 8002');
});


