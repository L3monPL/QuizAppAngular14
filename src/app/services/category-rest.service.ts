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

  categoryList?: Array<Category>

  subCategoryList?: Subscription
  customError?: string

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
      responseType: 'json'
    })
  }

  deleteCategory(
    id: number, 
    ):Observable<HttpResponse<Category>>{
    return this.http.delete<Category>(this.PATH + `/category/${id}`,{
      observe: 'response',
      responseType: 'json'
    })
  }

  getCategoryList(){
    this.subCategoryList = this.getCategory().subscribe({
      next: (response) => {
        if (response.body) {
          this.categoryList = response.body
          console.log(this.categoryList)
        }
        else{
          this.customError = 'Brak obiektu odpowiedzi'
        } 
      },
      error: (errorResponse) => {
        switch (errorResponse.status) {
          case 400|401:
            this.customError = errorResponse.error.message;
            break;
        
          default:
            this.customError = 'Błąd servera'
            break;
        }
      },
      complete: () => {}
    })
  }



}
