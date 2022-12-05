import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuestionRestService, Questions } from '../question-rest.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionManagerRestService {

  quizEmitterRest: EventEmitter<any> = new EventEmitter()

  questionsEmitterRest: EventEmitter<any> = new EventEmitter()

  subQuestionsList?: Subscription
  questionsList?: Array<Questions>
  customError?: string

  subQuestions?: Subscription
  showToEditQuestionsList?: boolean
  customErrorCategoryId?: string

  categoryId?: number
  level?: number

  currentId?: number

  currentLevel?: any

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

  questionsListByCategoryIdAndLvl(id: number, level: any){
    this.currentId = id
    this.currentLevel = level
    this.subQuestions = this.quiestionRestService.getQuestionsListByCategoryIdAndLvl(id, Number(level)).subscribe({
      next: (response) => {
        if (response.body) {
          this.showToEditQuestionsList = true
          this.questionsEmitterRest.emit(response.body)
        }
        else{
          this.customErrorCategoryId = 'Brak obiektu odpowiedzi'
        } 
      },
      error: (errorResponse) => {
            this.customErrorCategoryId = errorResponse.error;
      },
      complete: () => {}
    })
  }

  questionsListFromCreateNewQuiz(){
    if (this.currentId) {
      this.subQuestions = this.quiestionRestService.getQuestionsListByCategoryIdAndLvl(this.currentId!, Number(this.currentLevel)).subscribe({
        next: (response) => {
          if (response.body) {
            this.showToEditQuestionsList = true
            this.questionsEmitterRest.emit(response.body)
          }
          else{
            this.customErrorCategoryId = 'Brak obiektu odpowiedzi'
          } 
        },
        error: (errorResponse) => {
              this.customErrorCategoryId = errorResponse.error;
        },
        complete: () => {}
      })
    }
    }
    

}
