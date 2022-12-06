import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoryGroup, CategoryGroupServiceService } from 'src/app/services/category-group-service.service';
import { CategroyGroupManagerRestService } from 'src/app/services/components-services/categroy-group-manager-rest.service';

@Component({
  selector: 'app-delete-category-group',
  templateUrl: './delete-category-group.component.html',
  styleUrls: ['./delete-category-group.component.scss']
})
export class DeleteCategoryGroupComponent implements OnInit, OnDestroy {

  categoryGroupList?: Array<CategoryGroup>
  subCategoryGroupDelete?: Subscription

  subCategoryGroupList?: Subscription
  customError?: string
  loading = false

  deleteCategoryGroupDone = false

  categoryGroupDeleteForm = new FormGroup({
    categoryId: new FormControl<number|null>(null,Validators.required),
  });


  constructor(
    private categoryGroupManagerService: CategroyGroupManagerRestService,
    private categoryGroupRest: CategoryGroupServiceService
  ) { }
  ngOnDestroy(): void {
    this.subCategoryGroupList?.unsubscribe()
  }

  ngOnInit(): void {
    this.subscribeCategoryGroupList()
  }

  deleteCategoryGroupSubmit(){
    let categoryId = this.categoryGroupDeleteForm.get('categoryId')?.value
   
    if (this.categoryGroupDeleteForm.valid) {
      this.subCategoryGroupDelete = this.categoryGroupRest.deleteCategory(categoryId!).subscribe({
        next: (response) => {

            this.resetForm()
            this.categoryGroupManagerService.getCategoryList()

          // else{
          //   this.customError = 'Brak obiektu odpowiedzi'
          // } 
        },
        error: (errorResponse) => {
              this.customError = errorResponse.error;
        },
        complete: () => {
          
        }
      })
    }
    else{
      this.deleteCategoryGroupDone = false
    }
  }

  subscribeCategoryGroupList(){
    this.subCategoryGroupList = this.categoryGroupManagerService.serviceCategoryGroup.subscribe(
      res => {
        this.categoryGroupList = res
      },
      error => {}, 
      () => {})

  }

  resetForm(){
    this.categoryGroupDeleteForm.controls['categoryId'].setValue(null)

    this.categoryGroupDeleteForm.controls['categoryId'].setErrors(null)

    this.deleteCategoryGroupDone = true

    setTimeout(() => {
      this.deleteCategoryGroupDone = false
  }, 4000);
  }

  get f(){
    return this.categoryGroupDeleteForm.controls;
  }

}
