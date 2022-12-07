import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoryGroup, CategoryGroupServiceService } from 'src/app/services/category-group-service.service';
import { Category } from 'src/app/services/category-rest.service';
import { CategoryManagerRestService } from 'src/app/services/components-services/category-manager-rest.service';
import { CategroyGroupManagerRestService } from 'src/app/services/components-services/categroy-group-manager-rest.service';

@Component({
  selector: 'app-edit-category-in-category-group',
  templateUrl: './edit-category-in-category-group.component.html',
  styleUrls: ['./edit-category-in-category-group.component.scss']
})
export class EditCategoryInCategoryGroupComponent implements OnInit, OnDestroy {

  categoryGroupList?: Array<CategoryGroup>
  categoryList?: Array<Category>
  allCategoryList?: Array<Category>

  subCategoryGroupAdd?: Subscription
  subCategoryGroupEdit?: Subscription

  subCategoryList?: Subscription
  subCategoryGroupList?: Subscription
  // customErrorCategoryId?: string
  customErrorEditQuestions?: string
  currentCategoryGroupId?: number
  currentCategoryId?: number

  // showToEditQuestionsList?: boolean = false
  showToEditCategoryList = false
  showCategoryGroupAddForm = false
  hideBtnAddCategoryToGroup?: boolean = true
  

  categoryGroupEditForm = new FormGroup({
    categoryGroupId: new FormControl<number|null>(null,Validators.required),
  });

  editQuestionForm = new FormGroup({
    categoryId: new FormControl<number|null>(null,Validators.required),
  });

  constructor(
    public categoryGroupManagerService: CategroyGroupManagerRestService,
    private categoryGroupRest: CategoryGroupServiceService,
    private categoryManagerRest: CategoryManagerRestService
  ) { }
  ngOnDestroy(): void {
    this.subCategoryList?.unsubscribe()
    this.subCategoryGroupList?.unsubscribe()
  }

  ngOnInit(): void {
    this.subscribeCategoryGroupList()
    this.subscribeQuestionsList()
    this.subscribeCategoryList()
    this.hideBtnAddCategoryToGroup = false
  }

  editCategorySubmit(){
    let categoryGroupId = this.categoryGroupEditForm.get('categoryGroupId')?.value 

    this.currentCategoryGroupId = this.categoryGroupEditForm.get('categoryGroupId')?.value!
   
    if (categoryGroupId != null) {
      if (this.categoryGroupEditForm.valid) {
        this.getCategoryFromGroupList(categoryGroupId!)
      }
    }
    
  }

  resetFormAddCategoryToGroup(){
    this.editQuestionForm.controls['categoryId'].setValue(null)
    this.editQuestionForm.controls['categoryId'].setErrors(null)
    this.editQuestionForm.reset()

    // this.showCategoryGroupAddForm = false
    this.hideBtnAddCategoryToGroup = false
  }

  addCategoryToCategoryGroup(){
    let categoryId = this.editQuestionForm.get('categoryId')?.value 
    if (this.editQuestionForm.valid) {
      this.subCategoryGroupAdd = this.categoryGroupRest.putCategoryGroupAddCategory(this.currentCategoryGroupId!, categoryId!).subscribe({
        next: (response) => {
          if (response.body) {
            this.resetFormAddCategoryToGroup()
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
   
  }

  btnAddCategoryToCategoryGroup(){
    this.showCategoryGroupAddForm = true
    this.hideBtnAddCategoryToGroup = false
  }

  deleteCategoryFromCategoryGroup(id: number){
    // this.currentCategoryId = id

    // this.showToEditCategoryList = true

    // let selectedCategory  = this.categoryGroupList!.find(x => x.id === id)

    // console.log(selectedCategory)

    this.subCategoryGroupEdit = this.categoryGroupRest.putCategoryGroupRemoveCategory(this.currentCategoryGroupId!, id).subscribe({
      next: (response) => {
        if (response.body) {
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

  getCategoryFromGroupList(id: number){
    // let level = this.categoryGroupEditForm.get('categoryGroupId')?.value
    // this.resetForm()
    // console.log(id)
    this.categoryGroupManagerService.getCategoryListById(id)
  }
  
  subscribeCategoryList(){
    this.subCategoryList = this.categoryManagerRest.serviceCategory.subscribe(
      res => {
        this.allCategoryList = res
        console.log(this.allCategoryList)
      },
      error => {}, 
      () => {})
  }

  subscribeCategoryGroupList(){
    this.subCategoryGroupList = this.categoryGroupManagerService.serviceCategoryGroup.subscribe(
      res => {
        this.categoryList = res
        console.log(this.categoryList)
      },
      error => {}, 
      () => {})
  }

  subscribeQuestionsList(){
    this.categoryGroupManagerService.serviceCategoryGroupById.subscribe(
      res => {
        this.categoryGroupList = res
        console.log(this.categoryGroupList)
        this.hideBtnAddCategoryToGroup = true
        this.showCategoryGroupAddForm = false
      },
      error => {}, 
      () => {})
  }

  get f(){
    return this.categoryGroupEditForm.controls;
  }
  get f2(){
    return this.editQuestionForm.controls;
  }

}
