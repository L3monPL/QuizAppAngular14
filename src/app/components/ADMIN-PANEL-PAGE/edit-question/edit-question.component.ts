import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoryManagerRestService } from 'src/app/services/components-services/category-manager-rest.service';
import { QuestionRestService } from 'src/app/services/question-rest.service';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})
export class EditQuestionComponent implements OnInit {

  categoryList?: any
  subQuestions?: Subscription
  customErrorCategoryId?: string

  categoryEditForm = new FormGroup({
    categoryId: new FormControl<number|null>(null,Validators.required),
  });

  constructor(
    public categoryManagerService: CategoryManagerRestService,
    public questionRestSerivice: QuestionRestService
  ) { }

  ngOnInit(): void {
    this.subscribeCategoryList()
  }

  editCategorySubmit(){
    let categoryId = this.categoryEditForm.get('categoryId')?.value
   
    if (categoryId != null) {
      if (this.categoryEditForm.valid) {
        this.getQUestionsList(categoryId!)
      // this.getQuestionsValueToFOrm(categoryId!) to startuje przy wyborze pytania z listy pytań
      }
    }
    
  }

  subscribeCategoryList(){
    this.categoryManagerService.serviceCategory.subscribe(
      res => {
        this.categoryList = res
        console.log(this.categoryList)
      },
      error => {}, 
      () => {})

  }

  getQUestionsList(id: number){
    this.subQuestions = this.questionRestSerivice.getQuestionsListByCategoryIdAndLvl(id, 1).subscribe({
        next: (response) => {
          if (response.body) {
            // this.categoryById = response.body
            // this.addCategoryForm.controls['name'].setValue(this.categoryById.name)
            // this.addCategoryForm.controls['description'].setValue(this.categoryById.description!)
            // this.addCategoryForm.controls['iconUrl'].setValue(this.categoryById.iconUrl!)
            // this.addCategoryForm.controls['questionsPerLesson'].setValue(this.categoryById.questionsPerLesson)
            // this.addCategoryForm.controls['lessonsPerLevel'].setValue(this.categoryById.lessonsPerLevel)
            // this.showValuesToEditCategory = true
            // this.loadingEditingQuiz = false
          }
          else{
            this.customErrorCategoryId = 'Brak obiektu odpowiedzi'
            // this.loadingEditingQuiz = false
          } 
        },
        error: (errorResponse) => {
              this.customErrorCategoryId = errorResponse.error;
              // this.loadingEditingQuiz = false
        },
        complete: () => {}
      })
    console.log('tutaj pokazujemy listę pytań')
  }

  getQuestionsValueToFOrm(id: number){
    // this.loadingEditingQuiz = true
    // this.subQuestions = this.questionRestSerivice.getQuestionsListByCategoryIdAndLvl(id).subscribe({
    //   next: (response) => {
    //     if (response.body) {
    //       this.categoryById = response.body
    //       this.addCategoryForm.controls['name'].setValue(this.categoryById.name)
    //       this.addCategoryForm.controls['description'].setValue(this.categoryById.description!)
    //       this.addCategoryForm.controls['iconUrl'].setValue(this.categoryById.iconUrl!)
    //       this.addCategoryForm.controls['questionsPerLesson'].setValue(this.categoryById.questionsPerLesson)
    //       this.addCategoryForm.controls['lessonsPerLevel'].setValue(this.categoryById.lessonsPerLevel)
    //       this.showValuesToEditCategory = true
    //       this.loadingEditingQuiz = false
    //     }
    //     else{
    //       this.customErrorCategoryId = 'Brak obiektu odpowiedzi'
    //       this.loadingEditingQuiz = false
    //     } 
    //   },
    //   error: (errorResponse) => {
    //         this.customErrorCategoryId = errorResponse.error;
    //         this.loadingEditingQuiz = false
    //   },
    //   complete: () => {}
    // })
    console.log('tutaj inicjujemy wartości pytań do formularze')
  }

  get f(){
    return this.categoryEditForm.controls;
  }
}
