import { Component, OnInit } from '@angular/core';
import { CategoryManagerRestService } from 'src/app/services/components-services/category-manager-rest.service';
import { ImageManagerRestService } from 'src/app/services/components-services/image-manager-rest.service';
import { UserManagerRestService } from 'src/app/services/components-services/user-manager-rest.service';


@Component({
  selector: 'app-admin-panel-page',
  templateUrl: './admin-panel-page.component.html',
  styleUrls: ['./admin-panel-page.component.scss']
})
export class AdminPanelPageComponent implements OnInit {


  constructor(
    public categoryManagerService: CategoryManagerRestService,
    public userManagerService: UserManagerRestService,
    public imageManagerService: ImageManagerRestService
  ) { }

  ngOnInit(): void {
    this.categoryManagerService.getCategoryList()
    this.userManagerService.getUsersList()
    this.imageManagerService.getImagesList()
  }
 

}
