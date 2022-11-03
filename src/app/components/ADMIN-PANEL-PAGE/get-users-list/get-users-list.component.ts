import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Subscription } from 'rxjs';
import { UserManagerRestService } from 'src/app/services/components-services/user-manager-rest.service';
import { UserList, UserRestService } from 'src/app/services/user-rest.service';

@Component({
  selector: 'app-get-users-list',
  templateUrl: './get-users-list.component.html',
  styleUrls: ['./get-users-list.component.scss']
})
export class GetUsersListComponent implements OnInit, OnDestroy {

  // subUsersList?: Subscription
  usersList?: Array<UserList>
  // customError?: string

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 100;

  constructor(
    public userRest: UserRestService,
    public userManagerService: UserManagerRestService
  ) { }

  ngOnInit(): void {
    this.subscribeUserRest()
  }
  ngOnDestroy(): void {
    
  }

  subscribeUserRest(){
    this.userManagerService.serviceUser.subscribe(
      res => {
        this.usersList = res
      },
      error => {}, 
      () => {})

  }

}
