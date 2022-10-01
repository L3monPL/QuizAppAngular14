import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionRestService {

  private PATH = 'https://wsblearn-api.azurewebsites.net/api'

  constructor(
    private http: HttpClient
  ) { }

  getQuestionsList():Observable<HttpResponse<Array<any>>>{
    return this.http.get<Array<any>>(this.PATH + `/question`,{
      observe: 'response',
      responseType: 'json'
    })
  }

  getQuestionByLevelId(id: number):Observable<HttpResponse<any>>{
    return this.http.get<any>(this.PATH + `/question/${id}`,{
      observe: 'response',
      responseType: 'json'
    })
  }

  
}
