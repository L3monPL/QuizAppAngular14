// import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { Subscription } from 'rxjs';
// import { UserManagerRestService } from 'src/app/services/components-services/user-manager-rest.service';
// import { UserList, UserRestService } from 'src/app/services/user-rest.service';

// @Component({
//   selector: 'app-edit-user',
//   templateUrl: './edit-user.component.html',
//   styleUrls: ['./edit-user.component.scss']
// })
// export class EditUserComponent implements OnInit {

//   subUserEdit?: Subscription
//   customError?: string
//   editUserDone = false

//   subUsersList?: Subscription
//   usersList?: any

//   editUsersDone = false

//   showValuesToEditCategory = false

//   subUserId?: Subscription
//   customErrorUserId?: string

//   userById?: UserList

//   subEditUserId?: Subscription
//   customErrorEditUserId?: string

//   userEditById?: UserList

//   editUserForm = new FormGroup({
//     username: new FormControl<string>('',Validators.required),
//     password: new FormControl<string>('',Validators.required),
//     emailAddress: new FormControl<string>('',Validators.required),
//     roleId: new FormControl<number>(0,Validators.required)
//   });

//   userEditForm = new FormGroup({
//     userId: new FormControl<number|null>(null,Validators.required),
//   });

//   constructor(
//     public userRestService: UserRestService,
//     public userManagerService: UserManagerRestService 
//   ) { }

//   ngOnInit(): void {
//   }

//   get f(){
//     return this.editUserForm.controls;
//   }

//   get f2(){
//     return this.userEditForm.controls;
//   }

//   editCategorySubmit(){
//     let categoryId = this.userEditForm.get('categoryId')?.value
   
//     if (this.userEditForm.valid) {
//       this.getCategoryId(categoryId!)
//     }
//   }

//   editUser(){
//     let username = this.editUserForm.get('username')?.value
//     let password = this.editUserForm.get('password')?.value
//     let emailAddress = this.editUserForm.get('emailAddress')?.value
//     let roleId = this.editUserForm.get('roleId')?.value
//     this.subEditUserId = this.userRestService.editCategory(
//       categoryId!, name!, description!, iconUrl!, questionsPerLesson!, lessonsPerLevel!
//     ).subscribe({
//       next: (response) => {
//         if (response.body) {
//           this.categoryById = response.body
//           this.showValuesToEditCategory = false
//           this.resetForm()
//         }
//         else{
//           this.customErrorEditCategoryId = 'Brak obiektu odpowiedzi'
//         } 
//       },
//       error: (errorResponse) => {
//             this.customErrorEditCategoryId = errorResponse.error;
//       },
//       complete: () => {}
//     })
//   }

//   resetForm(){
//     this.userEditForm.controls['userId'].setValue(null)

//     this.userEditForm.controls['userId'].setErrors(null)

//     this.editUserDone = true

//     setTimeout(() => {
//       this.editUserDone = false
//   }, 4000);
//   }

//   subscribeUserList(){
//     this.userManagerService.serviceUser.subscribe(
//       res => {
//         this.usersList = res
//         console.log(this.usersList)
//       },
//       error => {}, 
//       () => {})

//   }

//   getUserId(id: number){
//     this.subUserId = this.userRestService.getUserById(id).subscribe({
//       next: (response) => {
//         if (response.body) {
//           this.userById = response.body
//           this.editUserForm.controls['username'].setValue(this.userById.username)
//           this.editUserForm.controls['password'].setValue(this.userById.password!)
//           this.editUserForm.controls['emailAddress'].setValue(this.userById.emailAddress!)
//           this.editUserForm.controls['roleId'].setValue(this.userById.roleId))
//           this.showValuesToEditCategory = true
//           console.log(this.categoryById)
//         }
//         else{
//           this.customErrorCategoryId = 'Brak obiektu odpowiedzi'
//         } 
//       },
//       error: (errorResponse) => {
//             this.customErrorCategoryId = errorResponse.error;
//       },
//       complete: () => {}
//     })
//   }

// }
