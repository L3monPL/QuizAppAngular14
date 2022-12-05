import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoryManagerRestService } from 'src/app/services/components-services/category-manager-rest.service';
import { QuestionRestService, Questions } from 'src/app/services/question-rest.service';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})
export class EditQuestionComponent implements OnInit {

  categoryList?: any
  questionsList?: Array<Questions>
  subQuestions?: Subscription
  subQuestionEdit?: Subscription
  customErrorCategoryId?: string
  customErrorEditQuestions?: string
  currentCategoryId?: number
  currentQuestionId?: number

  showToEditQuestionsList?: boolean = false
  showToEditQuestions = false

  categoryEditForm = new FormGroup({
    categoryId: new FormControl<number|null>(null,Validators.required),
  });

  levelForm = new FormGroup({
    currentLevel: new FormControl<number|string>("1",Validators.required),
  });

  editQuestionForm = new FormGroup({
    questionContent: new FormControl<string>('',Validators.required),
    imageUrl: new FormControl<string>(''),
    a: new FormControl<string>('',Validators.required),
    b: new FormControl('',Validators.required),
    c: new FormControl<string>(''),
    d: new FormControl<string>(''),
    correctAnswer: new FormControl<string>('',Validators.required),
    level: new FormControl<string>('',Validators.required),
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

    this.currentCategoryId = this.categoryEditForm.get('categoryId')?.value!
   
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
  changeValueLevel(){
    let level = this.levelForm.get('currentLevel')?.value
    console.log(level)
    this.editCategorySubmit()
  }

  getQUestionsList(id: number){
    let level = this.levelForm.get('currentLevel')?.value
    this.resetForm()
    this.subQuestions = this.questionRestSerivice.getQuestionsListByCategoryIdAndLvl(id, Number(level)).subscribe({
        next: (response) => {
          if (response.body) {
            this.questionsList = response.body
            this.showToEditQuestionsList = true
            console.log(this.questionsList)
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
    console.log('tutaj pokazujemy listę pytań')
  }

  getQuestionsValueToFOrm(id: number){

    this.currentQuestionId = id

    this.showToEditQuestions = true


    let selectedQuestion  = this.questionsList!.find(x => x.id === id)

    console.log(selectedQuestion)

    this.editQuestionForm.controls['questionContent'].setValue(selectedQuestion?.questionContent!)
    this.editQuestionForm.controls['imageUrl'].setValue(selectedQuestion?.imageUrl!)
    this.editQuestionForm.controls['a'].setValue(selectedQuestion?.a!)
    this.editQuestionForm.controls['b'].setValue(selectedQuestion?.b!)
    this.editQuestionForm.controls['c'].setValue(selectedQuestion?.c!)
    this.editQuestionForm.controls['d'].setValue(selectedQuestion?.d!)
    this.editQuestionForm.controls['correctAnswer'].setValue(selectedQuestion?.correctAnswer!)
    this.editQuestionForm.controls['level'].setValue(selectedQuestion?.level!.toString()!)














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
    console.log('tutaj inicjujemy wartości pytań do formularze' + id)
  }

  editQuestion(){
    let questionContent = this.editQuestionForm.get('questionContent')?.value
    let imageUrl = this.editQuestionForm.get('imageUrl')?.value

//CHANGE!!!!!!!!!!!!!!!!!!CHANGE!!!!!!!!!!!!!!!!!!CHANGE!!!!!!!!!!!!!!!!!!CHANGE!!!!!!!!!!!!!!!!!!
//CHANGE!!!!!!!!!!!!!!!!!!CHANGE!!!!!!!!!!!!!!!!!!CHANGE!!!!!!!!!!!!!!!!!!CHANGE!!!!!!!!!!!!!!!!!!
//CHANGE!!!!!!!!!!!!!!!!!!CHANGE!!!!!!!!!!!!!!!!!!CHANGE!!!!!!!!!!!!!!!!!!CHANGE!!!!!!!!!!!!!!!!!!
      imageUrl = 'https://wsblearnstorage.blob.core.windows.net/imagecontainer/Angular'

//CHANGE!!!!!!!!!!!!!!!!!!CHANGE!!!!!!!!!!!!!!!!!!CHANGE!!!!!!!!!!!!!!!!!!CHANGE!!!!!!!!!!!!!!!!!!
//CHANGE!!!!!!!!!!!!!!!!!!CHANGE!!!!!!!!!!!!!!!!!!CHANGE!!!!!!!!!!!!!!!!!!CHANGE!!!!!!!!!!!!!!!!!!
//CHANGE!!!!!!!!!!!!!!!!!!CHANGE!!!!!!!!!!!!!!!!!!CHANGE!!!!!!!!!!!!!!!!!!CHANGE!!!!!!!!!!!!!!!!!!

    let a = this.editQuestionForm.get('a')?.value
    let b = this.editQuestionForm.get('b')?.value
    let c = this.editQuestionForm.get('c')?.value
    let d = this.editQuestionForm.get('d')?.value
    let correctAnswer = this.editQuestionForm.get('correctAnswer')?.value
    let level = this.levelForm.get('currentLevel')?.value

    if (this.editQuestionForm.valid){
      this.subQuestionEdit = this.questionRestSerivice.putQuestions(this.currentQuestionId!,
        questionContent!, imageUrl!, a!, b!, c!, d!, correctAnswer!, Number(level!), this.currentCategoryId!
        ).subscribe({
        next: (response) => {
          if (response.body) {
            this.resetForm()
            this.editCategorySubmit()
            // this.categoryManagerService.getCategoryList()
          }
          else{
            this.customErrorEditQuestions = 'Brak obiektu odpowiedzi'
          } 
        },
        error: (errorResponse) => {
              this.customErrorEditQuestions = errorResponse.error;
        },
        complete: () => {
          
        }
      })
    }

  }

  resetForm(){
    this.editQuestionForm.controls['questionContent'].setValue(null)
    this.editQuestionForm.controls['imageUrl'].setValue(null)
    this.editQuestionForm.controls['a'].setValue(null)
    this.editQuestionForm.controls['b'].setValue(null)
    this.editQuestionForm.controls['c'].setValue(null)
    this.editQuestionForm.controls['d'].setValue(null)
    this.editQuestionForm.controls['correctAnswer'].setValue(null)
    this.editQuestionForm.controls['level'].setValue(null)


    this.editQuestionForm.controls['questionContent'].setErrors(null)
    this.editQuestionForm.controls['imageUrl'].setErrors(null)
    this.editQuestionForm.controls['a'].setErrors(null)
    this.editQuestionForm.controls['b'].setErrors(null)
    this.editQuestionForm.controls['c'].setErrors(null)
    this.editQuestionForm.controls['d'].setErrors(null)
    this.editQuestionForm.controls['correctAnswer'].setErrors(null)
    this.editQuestionForm.controls['level'].setErrors(null)

    this.showToEditQuestions = false
  }

  deleteQuestion(id: number){
    this.subQuestionEdit = this.questionRestSerivice.deleteQuestion(id).subscribe({
      next: (response) => {
        if (response.body) {
          this.resetForm()
          this.editCategorySubmit()
        }
        else{
          this.customErrorEditQuestions = 'Brak obiektu odpowiedzi'
        } 
      },
      error: (errorResponse) => {
            this.customErrorEditQuestions = errorResponse.error;
      },
      complete: () => {
        
      }
    })
  
  }

  get f(){
    return this.categoryEditForm.controls;
  }
  get f2(){
    return this.editQuestionForm.controls;
  }
}
