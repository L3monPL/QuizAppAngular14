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

  loading = true

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
          this.loading = false
        }
        else{
          this.customError = 'Brak obiektu odpowiedzi'
          this.loading = false
        } 
      },
      error: (errorResponse) => {
            this.customError = errorResponse.error;
            this.loading = false
      },
      complete: () => {}
    })
  }
}
