import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoryRestService } from 'src/app/services/category-rest.service';
import { CategoryManagerRestService } from 'src/app/services/components-services/category-manager-rest.service';
import { QuestionRestService } from 'src/app/services/question-rest.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  subAddCategory?: Subscription
  customError?: string

  addCategoryForm = new FormGroup({
    name: new FormControl<string>('',Validators.required),
    description: new FormControl<string>('',Validators.required),
    iconUrl: new FormControl<string>('',Validators.required),
    questionsPerLesson: new FormControl<number|null>(null,Validators.required),
    lessonsPerLevel: new FormControl<number|null>(null,Validators.required),
  });

  constructor(
    public questionRestService: QuestionRestService,
    public categoryManagerService: CategoryManagerRestService,
    public categoryRestService: CategoryRestService
  ) { }

  ngOnInit(): void {
  }

  get f(){
    return this.addCategoryForm.controls;
  }

  postQuestionToCategory(){
    let name = this.addCategoryForm.get('name')?.value
    let description = this.addCategoryForm.get('description')?.value
    let iconUrl = this.addCategoryForm.get('iconUrl')?.value
    let questionsPerLesson = this.addCategoryForm.get('questionsPerLesson')?.value
    let lessonsPerLevel = this.addCategoryForm.get('lessonsPerLevel')?.value
    if (this.addCategoryForm.valid) {
      this.subAddCategory = this.categoryRestService.postCategory(
        name!, description!, iconUrl!, questionsPerLesson!, lessonsPerLevel!
        ).subscribe({
        next: (response) => {
          if (response.body) {

          }
          else{
            this.customError = 'Brak obiektu odpowiedzi'
            console.log('wykonało')
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
          console.log('return getCategory')
          this.categoryManagerService.getCategoryList()
        },
        
        complete: () => {
        }
      })

    }
    else{
      console.log('reset')
    }
  }

}
