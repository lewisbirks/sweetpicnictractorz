import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from './employee';

@Pipe({
  name: 'nameFilter'
})
export class DepartmentFilterPipe implements PipeTransform {

  transform(employees: Employee[], filterText: string): Employee[] {
    if (!employees) return [];
    if (!filterText) return employees;

    return employees.filter(e => {
      return e.department.toLowerCase().includes(filterText.toLowerCase());
    });
    
  }

}
