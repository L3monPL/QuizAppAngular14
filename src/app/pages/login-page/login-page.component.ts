import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  helper = new JwtHelperService();

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(this.router.url === '/')
    {
      this.router.navigate(['./login'])
    }

    this.autoLogin()
  }
  autoLogin(){
    let urlId = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    let token = this.helper.decodeToken(localStorage.getItem('currentUser')!);
    console.log(token)
    let elo = urlId.valueOf()
    console.log(urlId.valueOf())
    console.log(token)
    const myJSON = JSON.stringify(token);
    // console.log(myJSON[3])


    // const crypto = require('crypto');
    // const fs = require('fs'); 
    // const sign = crypto.createSign('RSA-SHA256');

    // // copy / paste here the header and the payload of your JWT only
    // sign.write('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9');
    // sign.end();

    // var privateKey = fs.readFileSync('./private.key');

    // console.log(sign.sign(privateKey, 'base64'));
  }

}
