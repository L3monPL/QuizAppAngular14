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
  getCategoryGroupId(id: number):Observable<HttpResponse<CategoryGroup>>{
    return this.http.get<CategoryGroup>(this.PATH + `/categoryGroup/${id}`,{
      observe: 'response',
      responseType: 'json'
    })
  }

  postCategoryGroup():Observable<HttpResponse<any>>{
    return this.http.post<any>(this.PATH + `/categoryGroup`,{
      observe: 'response',
      responseType: 'text' as 'json'
    })
  }

  putCategoryGroupId(id: number):Observable<HttpResponse<any>>{
    return this.http.put<any>(this.PATH + `/categoryGroup/${id}`,{
      observe: 'response',
      responseType: 'text' as 'json'
    })
  }

  putCategoryGroupAddCategory(id: number, categoryId: number):Observable<HttpResponse<CategoryGroup>>{
    return this.http.put<CategoryGroup>(this.PATH + `/categoryGroup/addCategory/${id}/${categoryId}`,{

    },{
      observe: 'response',
      responseType: 'json'
    })
  }

  putCategoryGroupRemoveCategory(id: number, categoryId: number):Observable<HttpResponse<CategoryGroup>>{
    return this.http.put<CategoryGroup>(this.PATH + `/categoryGroup/addCategory/${id}/${categoryId}`,{

    },{
      observe: 'response',
      responseType: 'json'
    })
  }
}
