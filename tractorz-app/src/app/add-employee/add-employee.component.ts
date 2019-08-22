import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { DataService } from '../data.service';


@Component({
  selector: 'tractorz-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  public newEmployee: Employee;
  data: DataService;


  constructor(dataService: DataService) {
    this.data = dataService;
  }

  addEmployee(addForm): void {
    console.log("addEmployee");
    if (addForm.valid) {
      console.log(this.newEmployee);
      this.data.addEmployee(this.newEmployee).then(employee => {
        console.log(employee);
        this.newEmployee = new Employee();
        addForm.reset();
      });
    } else {
      console.log(addForm);
      console.error("Employee Form content is invalid");
    }
  }

  ngOnInit(): void {
    this.newEmployee = new Employee();
  }

}
