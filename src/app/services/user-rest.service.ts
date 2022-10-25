import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Message{
  message: string;
}

export interface Register{
  username: string,
  password: string,
  repeatPassword: string,
  emailAddress: string,
  roleId : number
}

export interface User{
  id: number;
  name: string;
  email: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserRestService {

  private PATH = 'https://wsblearn-api.azurewebsites.net/api'

  constructor(
    private http: HttpClient
  ) { }

  postUserLogin(login: string, password: string):Observable<HttpResponse<Message>>{
    return this.http.post<Message>(this.PATH + `/user/login`,{
      login:login,
      password: password,
    }, {
      observe: 'response',
      responseType: 'json',
      
    })
  }

  postUserRegister(username: string, password: string, repeatPassword: string,
    emailAdress: string, roleId: number):Observable<HttpResponse<Register>>{
    return this.http.post<Register>(this.PATH + `/user/register`,{
      username: username,
      password: password,
      repeatPassword: repeatPassword,
      emailAdress: emailAdress,
      roleId: roleId
    }, {
      observe: 'response',
      responseType: 'json',
      
    })
  }

  getUser():Observable<HttpResponse<User>>{
    return this.http.get<User>(this.PATH,{
      observe: 'response',
      responseType: 'json',
    })
  }

  putLogoutUser():Observable<HttpResponse<Message>>{
    return this.http.put<Message>(this.PATH + `/logout`,{},{
      observe: 'response',
      responseType: 'json',
    })
  }
}
