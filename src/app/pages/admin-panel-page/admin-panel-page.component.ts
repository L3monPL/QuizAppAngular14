import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { QuestionRestService } from 'src/app/services/question-rest.service';

@Component({
  selector: 'app-admin-panel-page',
  templateUrl: './admin-panel-page.component.html',
  styleUrls: ['./admin-panel-page.component.scss']
})
export class AdminPanelPageComponent implements OnInit, OnDestroy {

  subQuestionAddToCategory?: Subscription
  customError?: string

  questionAddToCategoryForm = new FormGroup({
    categoryId: new FormControl<number>(0,Validators.required),
    questionContent: new FormControl<string>('',Validators.required),
    imageUrl: new FormControl<string>(''),
    a: new FormControl<string>('',Validators.required),
    b: new FormControl('',Validators.required),
    c: new FormControl<string>('',Validators.required),
    d: new FormControl<string>('',Validators.required),
    correctAnswer: new FormControl<string>('',Validators.required),
    level: new FormControl<number>(0,Validators.required),
  });

  constructor(
    public questionRestService: QuestionRestService
  ) { }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.subQuestionAddToCategory?.unsubscribe()
  }

  addQuestionSubmit(){
    this.postQuestionToCategory()
  }

  get f(){
    return this.questionAddToCategoryForm.controls;
  }

  postQuestionToCategory(){
    let categoryId = this.questionAddToCategoryForm.get('categoryId')?.value
    let questionContent = this.questionAddToCategoryForm.get('questionContent')?.value
    let imageUrl = this.questionAddToCategoryForm.get('imageUrl')?.value
    let a = this.questionAddToCategoryForm.get('a')?.value
    let b = this.questionAddToCategoryForm.get('b')?.value
    let c = this.questionAddToCategoryForm.get('c')?.value
    let d = this.questionAddToCategoryForm.get('d')?.value
    let correctAnswer = this.questionAddToCategoryForm.get('correctAnswer')?.value
    let level = this.questionAddToCategoryForm.get('level')?.value
    this.subQuestionAddToCategory = this.questionRestService.postQuestionsByCategoryId(
      categoryId!, questionContent!, imageUrl!, a!, b!, c!, d!, correctAnswer!, level!
      ).subscribe({
      next: (response) => {
        if (response.body) {

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
