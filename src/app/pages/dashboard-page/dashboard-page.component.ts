import { Component, OnInit } from '@angular/core';
import { CategoryRestService } from 'src/app/services/category-rest.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  constructor(
    public categoryRest: CategoryRestService
  ) { }

  ngOnInit(): void {
    this.categoryRest.getCategoryList()
  }

}
