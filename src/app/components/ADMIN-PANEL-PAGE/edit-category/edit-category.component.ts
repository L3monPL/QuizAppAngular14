import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Category, CategoryRestService } from 'src/app/services/category-rest.service';
import { CategoryManagerRestService } from 'src/app/services/components-services/category-manager-rest.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  subQuestionCategoryEdit?: Subscription
  customError?: string
  editCategoryDone = false

  subCategoryList?: Subscription
  categoryList?: any

  addCategoryDone = false

  showValuesToEditCategory = false

  subCategoryId?: Subscription
  customErrorCategoryId?: string

  categoryById?: Category

  subEditCategoryId?: Subscription
  customErrorEditCategoryId?: string

  categoryEditById?: Category

  addCategoryForm = new FormGroup({
    name: new FormControl<string>('',Validators.required),
    description: new FormControl<string>('',Validators.required),
    iconUrl: new FormControl<string>('',Validators.required),
    questionsPerLesson: new FormControl<number|null>(null,Validators.required),
    lessonsPerLevel: new FormControl<number|null>(null,Validators.required),
  });

  categoryEditForm = new FormGroup({
    categoryId: new FormControl<number|null>(null,Validators.required),
  });

  constructor(
    private categoryRestService: CategoryRestService,
    public categoryManagerService: CategoryManagerRestService
  ) { }

  ngOnInit(): void {
    // this.getCategoryList()
    this.subscribeCategoryList()
  }
  ngOnDestroy(): void {
    // this.subQuestionCategoryEdit?.unsubscribe()
    // this.subCategoryList?.unsubscribe()
  }
  get f(){
    return this.categoryEditForm.controls;
  }

  get f2(){
    return this.addCategoryForm.controls;
  }

  editCategorySubmit(){
    let categoryId = this.categoryEditForm.get('categoryId')?.value
   
    if (categoryId != null) {
      if (this.categoryEditForm.valid) {
      this.getCategoryId(categoryId!)
      }
    }
    
  }


  editCategory(){
    if (this.addCategoryForm.valid) {
      let categoryId = this.categoryEditForm.get('categoryId')?.value
      let name = this.addCategoryForm.get('name')?.value
      let description = this.addCategoryForm.get('description')?.value
      let iconUrl = this.addCategoryForm.get('iconUrl')?.value
      let questionsPerLesson = this.addCategoryForm.get('questionsPerLesson')?.value
      let lessonsPerLevel = this.addCategoryForm.get('lessonsPerLevel')?.value
      this.subEditCategoryId = this.categoryRestService.editCategory(
      categoryId!, name!, description!, iconUrl!, questionsPerLesson!, lessonsPerLevel!
      ).subscribe({
      next: (response) => {
        if (response.body) {
          this.categoryById = response.body
          this.showValuesToEditCategory = false
          this.resetForm()
          // console.log(this.categoryById)
        }
        else{
          this.customErrorEditCategoryId = 'Brak obiektu odpowiedzi'
        } 
      },
      error: (errorResponse) => {
            this.customErrorEditCategoryId = errorResponse.error;
      },
      complete: () => {}
    }) 
    }
  }

  resetForm(){
    this.categoryEditForm.controls['categoryId'].setValue(null)

    this.categoryEditForm.controls['categoryId'].setErrors(null)

    this.editCategoryDone = true

    setTimeout(() => {
      this.editCategoryDone = false
  }, 4000);
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

  getCategoryId(id: number){
    this.subCategoryId = this.categoryRestService.getCategoryId(id).subscribe({
      next: (response) => {
        if (response.body) {
          this.categoryById = response.body
          this.addCategoryForm.controls['name'].setValue(this.categoryById.name)
          this.addCategoryForm.controls['description'].setValue(this.categoryById.description!)
          this.addCategoryForm.controls['iconUrl'].setValue(this.categoryById.iconUrl!)
          this.addCategoryForm.controls['questionsPerLesson'].setValue(this.categoryById.questionsPerLesson)
          this.addCategoryForm.controls['lessonsPerLevel'].setValue(this.categoryById.lessonsPerLevel)
          this.showValuesToEditCategory = true
          console.log(this.categoryById)
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
