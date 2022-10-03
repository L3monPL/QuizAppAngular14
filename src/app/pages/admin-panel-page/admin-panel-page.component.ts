import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionRestService } from 'src/app/services/question-rest.service';

@Component({
  selector: 'app-admin-panel-page',
  templateUrl: './admin-panel-page.component.html',
  styleUrls: ['./admin-panel-page.component.scss']
})
export class AdminPanelPageComponent implements OnInit {

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

  addQuestionSubmit(){

  }

  get f(){
    return this.questionAddToCategoryForm.controls;
  }

  postQuestionToCategory(){
  //   this.subQuestionsList = this.questionRestService.getQuestionsListByCategoryIdAndLvl(this.categoryId!, this.level!).subscribe({
  //     next: (response) => {
  //       if (response.body) {
  //         this.questionsList = response.body
  //         console.log(this.questionsList)
  //       }
  //       else{
  //         this.customError = 'Brak obiektu odpowiedzi'
  //       } 
  //     },
  //     error: (errorResponse) => {
  //       switch (errorResponse.status) {
  //         case 400|401:
  //           this.customError = errorResponse.error.message;
  //           break;
        
  //         default:
  //           this.customError = 'Błąd servera'
  //           break;
  //       }
  //     },
  //     complete: () => {}
  //   })
  }

}
