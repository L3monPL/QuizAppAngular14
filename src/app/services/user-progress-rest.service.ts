import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProgressRestService {

  private PATH = 'https://wsblearn-api.azurewebsites.net/api/UserProgress'

  constructor(
    private http: HttpClient
  ) { }

  postUserLogin(categoryId : number, level: number, quizLevelName: string, expGained: number):Observable<HttpResponse<any>>{
    return this.http.post<any>
    (this.PATH + `/${categoryId}/${level}/${quizLevelName}/${quizLevelName}/${expGained}`,{

    }, {
      observe: 'response',
      responseType: 'text' as 'json'
    })
  }
}
