import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoryRestService } from 'src/app/services/category-rest.service';
import { CategoryManagerRestService } from 'src/app/services/components-services/category-manager-rest.service';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.scss']
})
export class DeleteCategoryComponent implements OnInit, OnDestroy {

  subQuestionCategoryDelete?: Subscription
  customError?: string
  deleteCategoryDone = false

  subCategoryList?: Subscription
  categoryList?: any

  categoryDeleteForm = new FormGroup({
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
    this.subQuestionCategoryDelete?.unsubscribe()
    this.subCategoryList?.unsubscribe()
  }
  get f(){
    return this.categoryDeleteForm.controls;
  }

  deleteCategorySubmit(){
    let categoryId = this.categoryDeleteForm.get('categoryId')?.value
   
    if (this.categoryDeleteForm.valid) {
      this.subQuestionCategoryDelete = this.categoryRestService.deleteCategory(categoryId!).subscribe({
        next: (response) => {
          if (response.body) {
            this.resetForm()
            this.categoryManagerService.getCategoryList()
          }
          else{
            this.customError = 'Brak obiektu odpowiedzi'
          } 
        },
        error: (errorResponse) => {
          switch (errorResponse.status) {
            case 400|401:
              this.customError = errorResponse.error;
              break;
          
            default:
              this.customError = 'Błąd servera'
              break;
          }
        },
        complete: () => {
          
        }
      })
    }
    else{
      this.deleteCategoryDone = false
    }
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

  resetForm(){
    this.categoryDeleteForm.controls['categoryId'].setValue(null)

    this.categoryDeleteForm.controls['categoryId'].setErrors(null)

    this.deleteCategoryDone = true

    setTimeout(() => {
      this.deleteCategoryDone = false
  }, 4000);
  }

  subscribeCategoryList(){
    this.categoryManagerService.serviceCategory.subscribe(
      res => {
        this.categoryList = res
      },
      error => {}, 
      () => {})

  }

}
