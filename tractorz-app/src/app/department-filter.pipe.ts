import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from './employee';

@Pipe({
  name: 'departmentFilter'
})
export class DepartmentFilterPipe implements PipeTransform {

  transform(employees: Employee[], departmentID: string): Employee[] {
    if (!employees) return [];
    if (!departmentID) return employees;

    return employees.filter(e => {
      return e.department_id === parseInt(departmentID);
    });
    
  }

}
