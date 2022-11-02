import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Subscription } from 'rxjs';
import { UserManagerRestService } from 'src/app/services/components-services/user-manager-rest.service';
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

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 100;

  // subUsersList?: Subscription
  usersList?: Array<UserList>

  userDeleteForm = new FormGroup({
    userId: new FormControl<number|null>(null,Validators.required),
  });

  constructor(
    public userRest: UserRestService,
    public userManagerService: UserManagerRestService
  ) { }

  ngOnInit(): void {
    this.subscribeUserRest()
  }
  ngOnDestroy(): void {

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

  // getUsersList(){
  //   this.subUsersList = this.userRest.getUsersList().subscribe({
  //     next: (response) => {
  //       if (response.body) {
  //         this.usersList = response.body
  //         // console.log(this.usersList)

  //       }
  //       else{
  //         this.customError = 'Brak obiektu odpowiedzi'
  //       } 
  //     },
  //     error: (errorResponse) => {
  //           this.customError = errorResponse.error;
  //     },
  //     complete: () => {}
  //   })
  // }

  deleteUser(){
    let userId = this.userDeleteForm.get('userId')?.value
    if (this.userDeleteForm.valid) {
      this.subUserDelete = this.userRest.deleteUser(userId!).subscribe({
        next: (response) => {
          if (response.body) {
            this.resetForm()
            this.userManagerService.getUsersList()
          }
          else{
            this.customError = 'Brak obiektu odpowiedzi'
          } 
        },
        error: (errorResponse) => {
              this.customError = errorResponse.error;
        },
        complete: () => {
          
        }
      })
    }
    else{
      this.deleteUserDone = false
    }
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
