import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'tractorz-emp-details',
  templateUrl: './emp-details.component.html',
  styleUrls: ['./emp-details.component.css']
})
export class EmpDetailsComponent implements OnInit {
  data: DataService;
  selectedDepartment = "";

  constructor(dataService: DataService) {
    this.data = dataService;
  }

  ngOnInit() {
  }



}
