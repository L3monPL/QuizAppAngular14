import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Achievement{
  id: number,
  name: string,
  description: string
}

@Injectable({
  providedIn: 'root'
})
export class AchievementRestService {

  private PATH = 'https://wsblearn-api.azurewebsites.net/api/achievement'

  constructor(
    private http: HttpClient
  ) { }

  getAchievementList():Observable<HttpResponse<Array<Achievement>>>{
    return this.http.get<Array<Achievement>>(this.PATH,{
      observe: 'response',
      responseType: 'json'
    })
  }

  postAchievement(name: string, description: string):Observable<HttpResponse<Achievement>>{
    return this.http.post<Achievement>(this.PATH,{
      name: name,
      description: description
    },{
      observe: 'response',
      responseType: 'json'
    })
  }

  patchAchievement(name: string, description: string, id: number):Observable<HttpResponse<Achievement>>{
    return this.http.patch<Achievement>(this.PATH + `/${id}`,{
      name: name,
      description: description
    },{
      observe: 'response',
      responseType: 'json'
    })
  }

  deleteAchievement(id: number):Observable<HttpResponse<any>>{
    return this.http.delete<any>(this.PATH + `/${id}`,{
      observe: 'response',
      responseType: 'text' as 'json'
    })
  }

}
