import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-remind-password',
  templateUrl: './remind-password.component.html',
  styleUrls: ['./remind-password.component.scss']
})
export class RemindPasswordComponent implements OnInit {

  loading = false

  constructor(
    private router: Router
  ) { }

  remindPassword = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
  });

  ngOnInit(): void {
  }
  get f(){
    return this.remindPassword.controls;
  }
  // login(){
  //   this.router.navigateByUrl('remind-password');
  // }
  submit(){
    this.router.navigateByUrl('login');
  }

}
