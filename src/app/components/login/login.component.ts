import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserRestService } from 'src/app/services/user-rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userLogin?: Subscription;
  sub?: Subscription;
  subUser?: Subscription;
  customError?: string;
  loading = false;// TO DO CHANGE REGUEST RESTAPI
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 100;

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',Validators.required)
  });

  constructor(
    private router: Router,
    private userRest: UserRestService,
  ) { }

  ngOnInit(): void {
  }


  submit(){
    if (this.loginForm.valid) {
      this.loading = true;
      let loginValue = this.loginForm.get('email')!.value;
      let passwordValue = this.loginForm.get('password')!.value;
      this.userLogin = this.userRest.postUserLogin(loginValue!, passwordValue!).subscribe({
        next: (response) => {
            this.router.navigateByUrl('/home');
            console.log(response.body)
            localStorage.setItem('currentUser',response.body);
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

  get f(){
    return this.loginForm.controls;
  }
  remindPassword(){
    this.router.navigateByUrl('remind-password')
  }

}
