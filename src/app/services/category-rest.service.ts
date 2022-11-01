import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

export interface Category{
  id: number,
  name: string,
  description?: string,
  iconUrl?: string,
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

  getCategoryId(id: number):Observable<HttpResponse<Category>>{
    return this.http.get<Category>(this.PATH + `/category/${id}`,{
      observe: 'response',
      responseType: 'json'
    })
  }

  postCategory(
    name: string, 
    description: string, 
    iconUrl: string, 
    questionsPerLesson: number, 
    lessonsPerLevel: number, 
    ):Observable<HttpResponse<Category>>{
    return this.http.post<Category>(this.PATH + `/category`,{
      name: name, 
      description: description,
      iconUrl: iconUrl,
      questionsPerLesson: questionsPerLesson,
      lessonsPerLevel: lessonsPerLevel,
    },{
      observe: 'response',
      responseType: 'text' as 'json'
    })
  }

  deleteCategory(
    id: number, 
    ):Observable<HttpResponse<Category>>{
    return this.http.delete<Category>(this.PATH + `/category/${id}`,{
      observe: 'response',
      responseType: 'text' as 'json'
    })
  }

  editCategory(
    id: number,
    name: string, 
    description: string, 
    iconUrl: string, 
    questionsPerLesson: number, 
    lessonsPerLevel: number, 
    ):Observable<HttpResponse<Category>>{
    return this.http.put<Category>(this.PATH + `/category/${id}`,{
      name: name, 
      description: description,
      iconUrl: iconUrl,
      questionsPerLesson: questionsPerLesson,
      lessonsPerLevel: lessonsPerLevel,
    },{
      observe: 'response',
      responseType: 'text' as 'json'
    })
  }

  



}
