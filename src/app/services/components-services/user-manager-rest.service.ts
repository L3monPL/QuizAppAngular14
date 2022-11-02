import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserList, UserRestService } from '../user-rest.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagerRestService {

  subUsersList?: Subscription
  usersList?: Array<UserList>
  customError?: string

  loading = true

  serviceUser: EventEmitter<any> = new EventEmitter();

  constructor(
    private userRestService: UserRestService
  ) { }

  getUsersList(){
    this.subUsersList = this.userRestService.getUsersList().subscribe({
      next: (response) => {
        if (response.body) {
          this.usersList = response.body
          this.serviceUser.emit(response.body)
          this.loading = false
        }
        else{
          this.customError = 'Brak obiektu odpowiedzi'
          this.loading = false
        } 
      },
      error: (errorResponse) => {
            this.customError = errorResponse.error;
            this.loading = false
      },
      complete: () => {}
    })
  }
}
