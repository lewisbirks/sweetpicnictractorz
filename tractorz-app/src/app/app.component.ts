import { Component } from '@angular/core';
import { DataService } from './data.service'
@Component({
  selector: 'tractorz-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: DataService;
  title = 'tractorz-app';

  constructor(dataService: DataService) {
    this.data = dataService;
  }
}
