import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserManagerRestService } from 'src/app/services/components-services/user-manager-rest.service';
import { UserList, UserPatch, UserRestService } from 'src/app/services/user-rest.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  subUserEdit?: Subscription
  customError?: string
  editUserDone = false

  subUsersList?: Subscription
  usersList?: Array<UserList>

  editUsersDone = false

  showValuesToEditUser = false

  subUserId?: Subscription
  customErrorUserId?: string

  userById?: UserList

  subEditUserId?: Subscription
  customErrorEditUserId?: string

  userEditById?: UserList

  loadingValuesToEdit?: boolean

  editUserForm = new FormGroup({
    username: new FormControl<string>('',Validators.required),
    // password: new FormControl<string>('',Validators.required),
    emailAddress: new FormControl<string>('',Validators.required),
    // roleId: new FormControl<number>(0,Validators.required)
  });

  userListForm = new FormGroup({
    userId: new FormControl<number|null>(null,Validators.required),
  });

  constructor(
    public userRestService: UserRestService,
    public userManagerService: UserManagerRestService 
  ) { }

  ngOnInit(): void {
    this.subscribeUserList()
  }

  get f(){
    return this.userListForm.controls;
  }

  get f2(){
    return this.editUserForm.controls;
  }

  chooseUser(){
    // this.editUserForm.controls['password'].setErrors(null)
    let userId = this.userListForm.get('userId')?.value
    if (this.userListForm.get('userId')?.value != null) {
      if (this.userListForm.valid) {
      console.log(this.userListForm.valid)
      this.showUserValues(userId!)
    }
    }
    
  }

  editUser(){
    if (this.editUserForm.valid) {
      let username = this.editUserForm.get('username')?.value
      let password = this.editUserForm.get('password')?.value
      let emailAddress = this.editUserForm.get('emailAddress')?.value
      let roleId = this.editUserForm.get('roleId')?.value
      let userId = this.userListForm.get('userId')?.value
      this.subEditUserId = this.userRestService.postUserEdit(
        userId!, username!, emailAddress!
      ).subscribe({
        next: (response) => {
          if (response.body) {
            this.loadingValuesToEdit = false
            this.resetForm()
            this.userManagerService.getUsersList()
          }
          else{
            this.customErrorEditUserId = 'Brak obiektu odpowiedzi'
            this.loadingValuesToEdit = false
          } 
        },
        error: (errorResponse) => {
              this.customErrorEditUserId = errorResponse.error;
              console.log(this.customErrorEditUserId)
              this.loadingValuesToEdit = false
        },
        complete: () => {}
      })
    }
    
  }

  resetForm(){
    this.userListForm.controls['userId'].setValue(null)
    this.userListForm.controls['userId'].setErrors(null)

    // this.editUserForm.controls['username'].setValue(null)
    // this.editUserForm.controls['username'].setErrors(null)

    // this.editUserForm.controls['password'].setValue(null)
    // this.editUserForm.controls['password'].setErrors(null)

    // this.editUserForm.controls['emailAddress'].setValue(null)
    // this.editUserForm.controls['emailAddress'].setErrors(null)

    // this.editUserForm.controls['roleId'].setValue(null)
    // this.editUserForm.controls['roleId'].setErrors(null)

    this.editUserDone = true

    this.showValuesToEditUser = false

    setTimeout(() => {
      this.editUserDone = false
  }, 4000);
  }

  subscribeUserList(){
    this.userManagerService.serviceUser.subscribe(
      res => {
        this.usersList = res
        console.log(this.usersList)
      },
      error => {}, 
      () => {})

  }

  showUserValues(id: number){
    this.subUserId = this.userRestService.getUserById(id).subscribe({
      next: (response) => {
        if (response.body) {
          this.userById = response.body
          this.editUserForm.controls['username'].setValue(this.userById.username)
          // this.editUserForm.controls['password'].setValue(null)
          this.editUserForm.controls['emailAddress'].setValue(this.userById.emailAddress!)
          // this.editUserForm.controls['roleId'].setValue(this.userById.role.id)
          this.showValuesToEditUser = true
          // console.log(this.userById)
        }
        else{
          this.customErrorUserId = 'Brak obiektu odpowiedzi'
        } 
      },
      error: (errorResponse) => {
            this.customErrorUserId = errorResponse.error;
      },
      complete: () => {}
    })
  }

}
