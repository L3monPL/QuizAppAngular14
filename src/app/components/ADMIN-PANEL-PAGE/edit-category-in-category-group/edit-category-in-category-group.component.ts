import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoryGroup } from 'src/app/services/category-group-service.service';
import { Category } from 'src/app/services/category-rest.service';
import { CategroyGroupManagerRestService } from 'src/app/services/components-services/categroy-group-manager-rest.service';

@Component({
  selector: 'app-edit-category-in-category-group',
  templateUrl: './edit-category-in-category-group.component.html',
  styleUrls: ['./edit-category-in-category-group.component.scss']
})
export class EditCategoryInCategoryGroupComponent implements OnInit {

  categoryGroupList?: any
  categoryList?: Array<Category>

  // subCategory?: Subscription
  // subQuestionEdit?: Subscription
  // customErrorCategoryId?: string
  // customErrorEditQuestions?: string
  currentCategoryGroupId?: number
  // currentQuestionId?: number

  // showToEditQuestionsList?: boolean = false
  // showToEditQuestions = false

  categoryGroupEditForm = new FormGroup({
    categoryGroupId: new FormControl<number|null>(null,Validators.required),
  });

  editQuestionForm = new FormGroup({
    categoryId: new FormControl<number|null>(null,Validators.required),
  });

  constructor(
    private categoryGroupManagerService: CategroyGroupManagerRestService
  ) { }

  ngOnInit(): void {
    this.subscribeCategoryGroupList()
    this.subscribeQuestionsList()
  }

  editCategorySubmit(){
    let categoryGroupId = this.categoryGroupEditForm.get('categoryGroupId')?.value!

    this.currentCategoryGroupId = this.categoryGroupEditForm.get('categoryGroupId')?.value!
   
    if (categoryGroupId != null) {
      if (this.categoryGroupEditForm.valid) {
        this.getCategoryFromGroupList(categoryGroupId!)
      }
    }
    
  }

  getCategoryFromGroupList(id: number){
    // let level = this.categoryGroupEditForm.get('categoryGroupId')?.value
    // this.resetForm()
    // console.log(id)
    this.categoryGroupManagerService.getCategoryListById(id)
  }
  

  subscribeCategoryGroupList(){
    this.categoryGroupManagerService.serviceCategoryGroup.subscribe(
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
