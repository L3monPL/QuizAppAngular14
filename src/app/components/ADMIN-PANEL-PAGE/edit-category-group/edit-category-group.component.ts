import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Subscription } from 'rxjs';
import { CategoryGroup, CategoryGroupServiceService } from 'src/app/services/category-group-service.service';
import { CategroyGroupManagerRestService } from 'src/app/services/components-services/categroy-group-manager-rest.service';

@Component({
  selector: 'app-edit-category-group',
  templateUrl: './edit-category-group.component.html',
  styleUrls: ['./edit-category-group.component.scss']
})
export class EditCategoryGroupComponent implements OnInit {

  categoryGroupList?: Array<CategoryGroup>

  subCategoryGroupId?: Subscription
  subEditCategoryGroupId?: Subscription

  categoryGroupById?: CategoryGroup

  customErrorCategoryId?: string
  customErrorEditCategoryId?: string

  loadingEditingQuiz = false
  showValuesToEditCategory = false
  editCategoryGroupDone = false
  btnEditCategoryGroupDone = true

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 100;

  categoryGroupListForm = new FormGroup({
    categoryGroupId: new FormControl<number|null>(null,Validators.required),
  });

  categoryGroupEditForm = new FormGroup({
    name: new FormControl<string>('',Validators.required),
    iconUrl: new FormControl<string>('',Validators.required),
  });

  constructor(
    private categoryGrupManagerService: CategroyGroupManagerRestService,
    private categoryGroupRest: CategoryGroupServiceService
  ) { }

  ngOnInit(): void {
    this.subscribeCategoryGroupList()
  }

  editCategorySubmit(){
    let categoryId = this.categoryGroupListForm.get('categoryGroupId')?.value
   
    if (categoryId != null) {
      if (this.categoryGroupListForm.valid) {
      this.getCategoryGroupId(categoryId!)
      }
    }
    
  }

  getCategoryGroupId(id: number){
    this.loadingEditingQuiz = true
    this.subCategoryGroupId = this.categoryGroupRest.getCategoryGroupId(id).subscribe({
      next: (response) => {
        if (response.body) {
          this.categoryGroupById = response.body
          this.categoryGroupEditForm.controls['name'].setValue(this.categoryGroupById.name)
          this.categoryGroupEditForm.controls['iconUrl'].setValue(this.categoryGroupById.iconUrl!)
          this.showValuesToEditCategory = true
          this.loadingEditingQuiz = false
          // console.log(this.categoryById)
        }
        else{
          this.customErrorCategoryId = 'Brak obiektu odpowiedzi'
          this.loadingEditingQuiz = false
        } 
      },
      error: (errorResponse) => {
            this.customErrorCategoryId = errorResponse.error;
            this.loadingEditingQuiz = false
      },
      complete: () => {}
    })
  }

  editCategoryGroup(){
    if (this.categoryGroupEditForm.valid) {

      this.btnEditCategoryGroupDone = false
      let categoryGroupId = this.categoryGroupListForm.get('categoryGroupId')?.value
      let name = this.categoryGroupEditForm.get('name')?.value
      let iconUrl = this.categoryGroupEditForm.get('iconUrl')?.value
 
      this.subEditCategoryGroupId = this.categoryGroupRest.putCategoryGroupId(categoryGroupId!, name!, iconUrl!).subscribe({
      next: (response) => {
        if (response.body) {
          // this.categoryById = response.body
          this.showValuesToEditCategory = false
          this.categoryGrupManagerService.getCategoryList()
          this.resetForm()
          this.btnEditCategoryGroupDone = true
        }
        else{
          this.customErrorEditCategoryId = 'Brak obiektu odpowiedzi'
          this.btnEditCategoryGroupDone = true
        } 
      },
      error: (errorResponse) => {
            this.customErrorEditCategoryId = errorResponse.error;
            this.btnEditCategoryGroupDone = true
      },
      complete: () => {}
    }) 
    }
  }

  subscribeCategoryGroupList(){
    this.categoryGrupManagerService.serviceCategoryGroup.subscribe(
      res => {
        this.categoryGroupList = res
      },
      error => {}, 
      () => {})

  }

  resetForm(){
    this.categoryGroupListForm.controls['categoryGroupId'].setValue(null)

    this.categoryGroupListForm.controls['categoryGroupId'].setErrors(null)

    this.editCategoryGroupDone = true

    setTimeout(() => {
      this.editCategoryGroupDone = false
  }, 4000);
  }

  get f(){
    return this.categoryGroupListForm.controls;
  }

  get f2(){
    return this.categoryGroupEditForm.controls;
  }

}
