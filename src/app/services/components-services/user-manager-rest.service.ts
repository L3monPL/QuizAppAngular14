import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserDataService } from '../global-services/user-data.service';
import { UserList, UserRanking, UserRestService } from '../user-rest.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagerRestService {

  subUsersList?: Subscription
  usersList?: Array<UserList>
  customError?: string

  loading = true

  currentUserProgressValue?: UserList

  userListRanking?: Array<UserRanking>

  serviceUser: EventEmitter<any> = new EventEmitter();
  serviceCurrentUser: EventEmitter<any> = new EventEmitter();
  serviceUserRangingList: EventEmitter<any> = new EventEmitter();

  constructor(
    private userRestService: UserRestService,
    private userDataService: UserDataService,
    private router: Router
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

  checkUserProgress(){
    this.userRestService.getUserById(this.userDataService.userIdByToken!).subscribe({
      next: (response) => {
        if(response.body){
          this.currentUserProgressValue = response.body
          this.serviceCurrentUser.emit(response.body)
        }
        else{
          this.router.navigateByUrl('/login');
        }
      },
      error: (errorResponse) => {
        console.log(errorResponse);
        this.router.navigateByUrl('/login');

      },
      complete: () => {

      }
    }
  )
}
  checkRankingUsers(){
    this.userRestService.getUsersListSortByExp().subscribe({
      next: (response) => {
        if(response.body){
          this.userListRanking = response.body
          this.serviceUserRangingList.emit(response.body)
        }
      },
      error: (errorResponse) => {
        console.log(errorResponse);

      },
      complete: () => {

      }
    })
  }









}
