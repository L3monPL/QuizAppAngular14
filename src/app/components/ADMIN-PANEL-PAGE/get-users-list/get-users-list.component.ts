import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserList, UserRestService } from 'src/app/services/user-rest.service';

@Component({
  selector: 'app-get-users-list',
  templateUrl: './get-users-list.component.html',
  styleUrls: ['./get-users-list.component.scss']
})
export class GetUsersListComponent implements OnInit {

  subUsersList?: Subscription
  usersList?: Array<UserList>
  customError?: string

  constructor(
    public userRest: UserRestService
  ) { }

  ngOnInit(): void {

  }

  getUsersList(){
    this.subUsersList = this.userRest.getUsersList().subscribe({
      next: (response) => {
        if (response.body) {
          this.usersList = response.body
          console.log(this.usersList)
        }
        else{
          this.customError = 'Brak obiektu odpowiedzi'
        } 
      },
      error: (errorResponse) => {
        switch (errorResponse.status) {
          case 400|401:
            this.customError = errorResponse.error.message;
            break;
        
          default:
            this.customError = 'Błąd servera'
            break;
        }
      },
      complete: () => {}
    })
  }

}
