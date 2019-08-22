import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  employees: Employee[] = [];

  constructor(private http: HttpClient) {
    this.updateEmployees();
  }

  public addEmployee(newEmployee: Employee): void {
    this.employees.push(newEmployee);
  }

  public updateEmployees(): void {
    this.http.get<Employee[]>('/api/employee').subscribe(employees => {
      this.employees = employees;
    });
  }

}
