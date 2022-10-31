import { Component, OnInit } from '@angular/core';
import { CategoryRestService } from 'src/app/services/category-rest.service';
import { CategoryManagerRestService } from 'src/app/services/components-services/category-manager-rest.service';
import { UserDataService } from 'src/app/services/global-services/user-data.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  constructor(
    public categoryRest: CategoryRestService,
    public userData: UserDataService,
    public categoryManagerService: CategoryManagerRestService
  ) { }

  ngOnInit(): void {
    // this.categoryRest.getCategoryList()
    this.categoryManagerService.getCategoryList()
  }

}
