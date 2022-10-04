import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuestionRestService, Questions } from '../question-rest.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionManagerRestService {

  quizEmitterRest: EventEmitter<any> = new EventEmitter()

  subQuestionsList?: Subscription
  questionsList?: Array<Questions>
  customError?: string

  categoryId?: number
  level?: number

  constructor(
    private quiestionRestService: QuestionRestService
  ) { }

  getQuestionsList(){
    this.subQuestionsList = this.quiestionRestService.getQuestionsListByCategoryIdAndLvl(this.categoryId!, this.level!).subscribe({
      next: (response) => {
        if (response.body) {
          this.questionsList = response.body
          console.log(this.questionsList)
          // let selectedCategory = this.questionsList![0]
          // console.log(selectedCategory)
          this.quizEmitterRest.emit(this.questionsList)
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