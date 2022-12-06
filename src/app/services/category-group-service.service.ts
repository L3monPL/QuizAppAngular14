import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CategoryGroup{
  id: number,
  name: string,
  iconUrl: string,
  categories: Array<Categories>
}

export interface Categories{
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
export class CategoryGroupServiceService {

  private PATH = 'https://wsblearn-api.azurewebsites.net/api'

  constructor(
    private http: HttpClient
  ) { }

  getCategoryGroup():Observable<HttpResponse<Array<CategoryGroup>>>{
    return this.http.get<Array<CategoryGroup>>(this.PATH + `/categoryGroup`,{
      observe: 'response',
      responseType: 'json'
    })
  }
}
