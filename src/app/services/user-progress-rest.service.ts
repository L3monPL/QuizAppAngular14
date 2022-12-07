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

  postUserProgressExpGained(categoryId : number, level: number, quizLevelName: string, expGained: number):Observable<HttpResponse<any>>{
    return this.http.patch<any>
    (this.PATH + `/${categoryId}/${level}/${quizLevelName}/${expGained}`,{

    }, {
      observe: 'response',
      responseType: 'text' as 'json'
    })
  }

  postUserProgressCompleteAchievement(userId : number, achievementId: number):Observable<HttpResponse<any>>{
    return this.http.patch<any>
    (this.PATH + `/${userId}/${achievementId}`,{

    }, {
      observe: 'response',
      responseType: 'text' as 'json'
    })
  }
}
