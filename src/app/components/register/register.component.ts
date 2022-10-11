import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserRestService } from 'src/app/services/user-rest.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  loading = false;// TO DO CHANGE REGUEST RESTAPI
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 100;

  postRegisterUser?: Subscription
  customError?: string

  registerForm = new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
    passwordSecond: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required, Validators.email]),
    roleId: new FormControl<number>(0,Validators.required),
  });

  constructor(
    private router: Router,
    private userRest: UserRestService
  ) { }

  ngOnInit(): void {
  }
  submit(){
    if(this.registerForm.valid){
      this.loading = true
      let username = this.registerForm.get('username')!.value
      let password = this.registerForm.get('password')!.value
      let passwordSecond = this.registerForm.get('password')!.value
      let emailValue = this.registerForm.get('email')!.value
      let roleId = 0
        this.postRegisterUser = this.userRest.postUserRegister(username!, password!,
          passwordSecond!, emailValue!, roleId!).subscribe({
          next: (response) => { 
            this.loading = false;
            this.router.navigateByUrl('login');
          },
          error: (errorResponse) => {
            // console.log(errorResponse);
            switch (errorResponse.status) {
              case 403:
                this.customError = errorResponse.error.message;
                this.loading = false;
                break;
              case 404:
                this.customError = errorResponse.error.message;
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
            
          }
        }
      )


  }

  }
  get f(){
    return this.registerForm.controls;
  }
  login(){
    this.router.navigateByUrl('login');
  }

}
