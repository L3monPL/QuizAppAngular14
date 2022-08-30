import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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

  loginForm = new UntypedFormGroup({
    email: new UntypedFormControl('',[Validators.required, Validators.email]),
    password: new UntypedFormControl('',Validators.required)
  });

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }


  submit(){
    if (this.loginForm.valid) {
      let loginValue = this.loginForm.get('email')!.value;
      let passwordValue = this.loginForm.get('password')!.value;
    }
  }

  get f(){
    return this.loginForm.controls;
  }
  remindPassword(){
    this.router.navigateByUrl('remind-password');
  }

}
