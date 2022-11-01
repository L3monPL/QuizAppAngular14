import { Component, OnInit } from '@angular/core';
import { CategoryManagerRestService } from 'src/app/services/components-services/category-manager-rest.service';


@Component({
  selector: 'app-admin-panel-page',
  templateUrl: './admin-panel-page.component.html',
  styleUrls: ['./admin-panel-page.component.scss']
})
export class AdminPanelPageComponent implements OnInit {


  constructor(
    private categoryManagerService: CategoryManagerRestService
  ) { }

  ngOnInit(): void {
    this.categoryManagerService.getCategoryList()
  }
 

}
