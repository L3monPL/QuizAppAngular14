import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserDataService } from 'src/app/services/global-services/user-data.service';
import { UserRestService } from 'src/app/services/user-rest.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {

  changePassword?: Subscription
  loading = false
  customError?: string

  currentUserId?: number

  changePasswordChange = new FormGroup({
    oldPassword: new FormControl('',Validators.required),
    newPassword: new FormControl('',Validators.required),
    repeatNewPassword: new FormControl('',Validators.required)
  });

  constructor(
    private userDataService: UserDataService,
    private userRest: UserRestService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentUserId = this.userDataService.getId()
  }

  get f(){
    return this.changePasswordChange.controls;
  }

  submit(){
    if (this.changePasswordChange.valid) {
      let oldPassword = this.changePasswordChange.get('oldPassword')!.value
      let newPassword = this.changePasswordChange.get('newPassword')!.value
      let repeatNewPassword = this.changePasswordChange.get('repeatNewPassword')!.value

      this.changePassword = this.userRest.postUpdatePassword(this.currentUserId!, oldPassword!, newPassword!, repeatNewPassword!).subscribe({
        next: (response) => {
          if (response) {
            this.router.navigateByUrl('/home/dashboard'); 
          }
        },
        error: (errorResponse) => {
          // console.log(errorResponse);
          switch (errorResponse.status) {
            case 400:
            case 401:
            case 403:
              this.customError = errorResponse.error;
              this.loading = false;
              break;
          
            default:
              this.customError = 'Błąd serwera'
              this.loading = false;
              break;
          }
          // console.log(this.customError);
        },
        complete: () => {
          this.loading = false;
        }
      }
    )}
  }


}
