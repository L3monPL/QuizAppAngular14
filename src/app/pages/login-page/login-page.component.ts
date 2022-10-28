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

  obj0 = Array<any>()

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


    // console.log(myJSON.replace('"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"', '').replace(':"', ''))
    // let replaceValue = myJSON.replace('"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"', '').replace(':"', '')
    // console.log(replaceValue[1])

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
