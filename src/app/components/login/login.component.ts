import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';
import { UserDataService } from 'src/app/services/global-services/user-data.service';
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

  helper = new JwtHelperService();

  obj0 = Array<any>()

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',Validators.required)
  });

  constructor(
    private router: Router,
    private userRest: UserRestService,
    private userData: UserDataService
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
            this.getUserStart()
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

  getUserStart(){
    let urlId = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    let token = this.helper.decodeToken(localStorage.getItem('currentUser')!);
    // console.log(token)
    let elo = urlId.valueOf()
    // console.log(urlId.valueOf())
    // console.log(token)
    const myJSON = JSON.stringify(token);
    // console.log(myJSON.slice(-40))
    // console.log(myJSON)
    // const obj = Object.fromEntries(token);
    // console.log(obj)

    const object2 = Object.fromEntries(
      Object.entries(token)
      .map(([ key, val ]) => [ key, val ])
    );
    // console.log(object2)


    for (let [key, value] of Object.entries(token)) {
      // console.log(`${key}: ${value}`)
      this.obj0.push(`${key}: ${value}`)
    }
    let indexOfToken = this.obj0[0]
    // console.log(indexOfToken)

    console.log(indexOfToken.replace('http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier: ', ''))
    let userIdFromToken = indexOfToken.replace('http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier: ', '')
    this.userData.userIdByToken = userIdFromToken
  }

}
