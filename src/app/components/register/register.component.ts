import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomValidators } from 'src/app/custom-validators/custom-validators';
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
    password: new FormControl<null>(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(64)
      ]),
    repeatPassword: new FormControl<null>(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(64)
      ]),
    email: new FormControl('',[Validators.required, Validators.email]),
    roleId: new FormControl<number>(0,Validators.required),
    }, { 
    validators: new CustomValidators()
      .validatorThisSameValue("password", "repeatPassword"),
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
      let profilePictureUrl = 'https://wsblearnstorage.blob.core.windows.net/avatarcontainer/User_Icon_0-ce698e0b-12fd-461a-88ca-0bd24f9484cf.png'
      let roleId = 2
        this.postRegisterUser = this.userRest.postUserRegister(username!, password!,
          passwordSecond!, emailValue!, profilePictureUrl, roleId!).subscribe({
          next: (response) => { 
            this.loading = false;
            this.router.navigateByUrl('login');
          },
          error: (errorResponse) => {
                this.customError = errorResponse.error;
                this.loading = false;
          },
          complete: () => {
            
          }
        }
      )
      if(this.registerForm.invalid) {
        this.registerForm.setErrors({ ...this.registerForm.errors, 'errorThisSamePassword': true });
        return;
      }


  }

  }
  get f(){
    return this.registerForm.controls;
  }
  login(){
    this.router.navigateByUrl('login');
  }

}
