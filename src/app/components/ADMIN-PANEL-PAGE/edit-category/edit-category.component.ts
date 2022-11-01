import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoryRestService } from 'src/app/services/category-rest.service';
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
    this.subQuestionCategoryEdit?.unsubscribe()
    this.subCategoryList?.unsubscribe()
  }
  get f(){
    return this.categoryEditForm.controls;
  }

  get f2(){
    return this.addCategoryForm.controls;
  }

  editCategorySubmit(){
    let categoryId = this.categoryEditForm.get('categoryId')?.value
   
    if (this.categoryEditForm.valid) {
      this.showValuesToEditCategory = true
    }
    //   this.subQuestionCategoryEdit = this.categoryRestService.deleteCategory(categoryId!).subscribe({
    //     next: (response) => {
    //       if (response.body) {
    //         this.resetForm()
    //         this.categoryManagerService.getCategoryList()
    //       }
    //       else{
    //         this.customError = 'Brak obiektu odpowiedzi'
    //       } 
    //     },
    //     error: (errorResponse) => {
    //       switch (errorResponse.status) {
    //         case 400|401:
    //           this.customError = errorResponse.error;
    //           break;
          
    //         default:
    //           this.customError = 'Błąd servera'
    //           break;
    //       }
    //     },
    //     complete: () => {
          
    //     }
    //   })
    // }
    // else{
    //   this.editCategoryDone = false
    // }
  }

  // getCategoryList(){
  //   this.subCategoryList = this.categoryRestService.getCategory().subscribe({
  //     next: (response) => {
  //       if (response.body) {
  //         this.categoryList = response.body
  //         console.log(this.categoryList)

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
  // }

  putQuestionToCategory(){

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

}
