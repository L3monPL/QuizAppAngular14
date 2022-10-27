import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserList, UserRestService } from 'src/app/services/user-rest.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit, OnDestroy {

  subUserDelete?: Subscription
  customError?: string
  deleteUserDone = false

  subUsersList?: Subscription
  usersList?: Array<UserList>

  userDeleteForm = new FormGroup({
    userId: new FormControl<number|null>(null,Validators.required),
  });

  constructor(
    public userRest: UserRestService
  ) { }

  ngOnInit(): void {
    this.getUsersList()
  }
  ngOnDestroy(): void {
    this.subUsersList?.unsubscribe()
  }

  get f(){
    return this.userDeleteForm.controls;
  }

  resetForm(){
    this.userDeleteForm.controls['userId'].setValue(null)

    this.userDeleteForm.controls['userId'].setErrors(null)

    this.deleteUserDone = true

    setTimeout(() => {
      this.deleteUserDone = false
  }, 4000);
  }

  getUsersList(){
    this.subUsersList = this.userRest.getUsersList().subscribe({
      next: (response) => {
        if (response.body) {
          this.usersList = response.body
          // console.log(this.usersList)

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

  deleteUser(){
    let userId = this.userDeleteForm.get('userId')?.value
    if (this.userDeleteForm.valid) {
      this.subUserDelete = this.userRest.deleteUser(userId!).subscribe({
        next: (response) => {
          if (response.body) {
            this.resetForm()
            this.getUsersList()
          }
          else{
            this.customError = 'Brak obiektu odpowiedzi'
          } 
        },
        error: (errorResponse) => {
          switch (errorResponse.status) {
            case 400|401:
              this.customError = errorResponse.error;
              break;
          
            default:
              this.customError = 'Błąd servera'
              break;
          }
        },
        complete: () => {
          
        }
      })
    }
    else{
      this.deleteUserDone = false
    }
  }

}
