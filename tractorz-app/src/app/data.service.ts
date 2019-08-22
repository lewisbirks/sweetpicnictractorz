import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  employees: Employee[] = [];
  departments: String[] = [];

  constructor(private http: HttpClient) {
    this.updateEmployees();
    this.updateDepartments();
  }

  public updateEmployees(): void {
    this.http.get<Employee[]>('/api/employee').subscribe(employees => {
      this.employees = employees;
    });
  }

  public updateDepartments(): void {
    this.http.get<{department_id: number, department_name: String}[]>('/api/department').subscribe(departments => {
      this.departments = departments.map(x => x.department_name);
    });
  }

  public addEmployee(newEmployee: Employee): Promise<Employee> {
    console.log("addEmployee");
    return new Promise((resolve, reject) => {
      this.http.post<Employee>('/api/employee', newEmployee).subscribe(employee => {
        this.employees.push(employee);
        resolve(employee);
      });
    });
  }

}
