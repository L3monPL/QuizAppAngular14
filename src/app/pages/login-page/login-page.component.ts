import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/services/global-services/user-data.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {


  constructor(
    private router: Router,
    private userDataService: UserDataService
    ) { }

  ngOnInit(): void {
    if(this.router.url === '/')
    {
      this.router.navigate(['./login'])
    }
  }
  
}
