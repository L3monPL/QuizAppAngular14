import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Category{
  id: number,
  name: string,
  description: string,
  iconUrl: string,
  questionsPerLesson: number,
  lessonsPerLevel: number
}

@Injectable({
  providedIn: 'root'
})
export class CategoryRestService {

  private PATH = 'https://wsblearn-api.azurewebsites.net/api'

  constructor(
    private http: HttpClient
  ) { }

  getCategory():Observable<HttpResponse<Array<Category>>>{
    return this.http.get<Array<Category>>(this.PATH + `/category`,{
      observe: 'response',
      responseType: 'json'
    })
  }
}
