import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Questions{
  id: number,
  questionContent: string,
  imageUrl: string,
  a: string,
  b: string,
  c: string,
  d: string,
  correctAnswer: string,
  level: number,
  categoryId: number
}

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

  getQuestionsListByCategoryIdAndLvl(categoryId: number, level: number):Observable<HttpResponse<Array<Questions>>>{
    return this.http.get<Array<Questions>>(this.PATH + `/question/${categoryId}/${level}`,{
      observe: 'response',
      responseType: 'json'
    })
  }

  getAllQuestionsListByCategoryIdAndLvl(categoryId: number, level: number):Observable<HttpResponse<Array<Questions>>>{
    return this.http.get<Array<Questions>>(this.PATH + `/question/all/${categoryId}/${level}`,{
      observe: 'response',
      responseType: 'json'
    })
  }


  postQuestionsByCategoryId(
    categoryId: number, 
    questionContent: string, 
    imageUrl: string, 
    a: string, 
    b: string, 
    c: string, 
    d: string, 
    correctAnswer: string, 
    level: number):Observable<HttpResponse<Questions>>{
    return this.http.post<Questions>(this.PATH + `/question/${categoryId}`,{
      questionContent: questionContent, 
      imageUrl: imageUrl,
      a: a,
      b: b,
      c: c,
      d: d,
      correctAnswer: correctAnswer,
      level: level
    },{
      observe: 'response',
      responseType: 'text' as 'json'
    })
  }

  putQuestions(
    questionId: number,
    questionContent: string, 
    imageUrl: string, 
    a: string, 
    b: string, 
    c: string, 
    d: string, 
    correctAnswer: string, 
    level: number,
    categoryId: number):Observable<HttpResponse<Questions>>{
    return this.http.put<Questions>(this.PATH + `/question/${questionId}`,{
      questionContent: questionContent, 
      imageUrl: imageUrl,
      a: a,
      b: b,
      c: c,
      d: d,
      correctAnswer: correctAnswer,
      level: level,
      categoryId: categoryId
    },{
      observe: 'response',
      responseType: 'text' as 'json'
    })
  }

  deleteQuestion(id: number):Observable<HttpResponse<any>>{
    return this.http.delete<any>(this.PATH + `/question/${id}`,{
      observe: 'response',
      responseType: 'text' as 'json'
    })
  }



  

  
}
