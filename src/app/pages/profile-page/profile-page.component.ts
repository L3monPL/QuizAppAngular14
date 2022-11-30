import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserManagerRestService } from 'src/app/services/components-services/user-manager-rest.service';
import { UserDataService } from 'src/app/services/global-services/user-data.service';
import { UserList } from 'src/app/services/user-rest.service';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  subCurrentUser?: Subscription
  currentUser?: UserList
  

  constructor(
    public userData: UserDataService,
    private router: Router,
    public userManagerService: UserManagerRestService
  ) 
  {
  }

  ngOnInit(): void {
    if(this.router.url === '/home/profile')
    {
      this.router.navigate(['./home/profile/main'])
    }
    // this.userManagerService.checkUserProgress()

    this.subCurrentUser = this.userManagerService.serviceCurrentUser.subscribe(
      res => {
        this.currentUser = res
      },
      error => {}, 
      () => {}) 
  }

}
