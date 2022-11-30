import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Message{
  message: string;
}

export interface Login{
  login: string,
  password: string
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

export interface UserList{
  id: number,
  username: string,
  emailAddress: string,
  profilePictureUrl: string,
  role: {
    id: number,
    name: string
  },
  userProgress: {
    experiencePoints: number,
    level: number,
    totalCompletedQuiz: number,
    totalCompletedCategory: number,
    categoryProgress: Array<CategoryProgress>
  }
}
export interface CategoryProgress{
  id: string,
  categoryName: string,
  categoryId: number,
  userProgressId: number,
  levelProgresses?: Array<LevelProgresses>
}

export interface LevelProgresses{
  id: number,
  levelName?: string,
  finishedQuizzes?: string,
  quizzesToFinish?: string,
  levelCompleted?: boolean,
  categoryProgressId: number
}

export interface UserPatch{
  username: number,
  // password: string,
  emailAddress: string,
  // roleId?: number
}

export interface UserRanking{
  id: number,
  userName: string,
  emailAddress: string,
  profilePictureUrl: string,
  experiencePoints: number,
  level: number
}

@Injectable({
  providedIn: 'root'
})
export class UserRestService {

  private PATH = 'https://wsblearn-api.azurewebsites.net/api'

  constructor(
    private http: HttpClient
  ) { }

  postUserLogin(login: string, password: string):Observable<HttpResponse<any>>{
    return this.http.post<any>(this.PATH + `/account/login`,{
      login:login,
      password: password,
    }, {
      observe: 'response',
      responseType: 'text' as 'json'
    })
  }

  postUserRegister(username: string, password: string, confirmPassword: string,
    emailAddress: string, profilePictureUrl: string, roleId: number):Observable<HttpResponse<Register>>{
    return this.http.post<Register>(this.PATH + `/account/register`,{
      username: username,
      password: password,
      confirmPassword: confirmPassword,
      emailAddress: emailAddress,
      profilePictureUrl: profilePictureUrl,
      roleId: roleId
    }, {
      observe: 'response',
      responseType: 'json',
      
    })
  }

  getUserById(id: number):Observable<HttpResponse<UserList>>{
    return this.http.get<UserList>(this.PATH + `/user/${id}`,{
      observe: 'response',
      responseType: 'json',
    })
  }

  // putLogoutUser():Observable<HttpResponse<Message>>{
  //   return this.http.put<Message>(this.PATH + `/logout`,{},{
  //     observe: 'response',
  //     responseType: 'json',
  //   })
  // }

  getUsersList():Observable<HttpResponse<Array<UserList>>>{
    return this.http.get<Array<UserList>>(this.PATH + `/user`,{
      observe: 'response',
      responseType: 'json',
    })
  }

  getUsersListSortByExp():Observable<HttpResponse<Array<UserRanking>>>{
    return this.http.get<Array<UserRanking>>(this.PATH + `/user/SortByExp`,{
      observe: 'response',
      responseType: 'json',
    })
  }

  deleteUser(
    id: number, 
    ):Observable<HttpResponse<User>>{
    return this.http.delete<User>(this.PATH + `/user/${id}`,{
      observe: 'response',
      responseType: 'text' as 'json'
    })
  }

  postUserEdit(userId: number, username: string,
    emailAddress: string):Observable<HttpResponse<UserPatch>>{
    return this.http.patch<UserPatch>(this.PATH + `/user/${userId}`,{
      username: username,
      // password: password,
      emailAddress: emailAddress,
      // roleId: roleId
    }, {
      observe: 'response',
      responseType: 'json',
    })
  }

  postUserAvatar(userId: number, profilePictureUrl: string):Observable<HttpResponse<any>>{
    return this.http.patch<any>(this.PATH + `/user/${userId}`,{
      profilePictureUrl: profilePictureUrl,
    }, {
      observe: 'response',
      responseType: 'json',
    })
  }







}
