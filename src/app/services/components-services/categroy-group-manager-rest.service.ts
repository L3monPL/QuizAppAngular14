import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryGroup, CategoryGroupServiceService } from '../category-group-service.service';

@Injectable({
  providedIn: 'root'
})
export class CategroyGroupManagerRestService {

  categoryList?: Array<CategoryGroup>

  subCategoryList?: Subscription
  subCategoryGroupByIdList?: Subscription
  customError?: string
  loading = true;
  showToEditCategoryGroupList = false

  currentGroupId?: number

  serviceCategoryGroup: EventEmitter<any> = new EventEmitter();
  serviceCategoryGroupById: EventEmitter<any> = new EventEmitter();

  constructor(
    private categoryGroupRest: CategoryGroupServiceService
  ) { }

  getCategoryList(){
    this.subCategoryList = this.categoryGroupRest.getCategoryGroup().subscribe({
      next: (response) => {
        if (response.body) {
          this.categoryList = response.body
          // console.log(this.categoryList + "response this aaaa")
          this.serviceCategoryGroup.emit(response.body)
          this.loading = false
        }
        else{
          this.customError = 'Brak obiektu odpowiedzi'
          this.loading = false
        } 
      },
      error: (errorResponse) => {
            this.customError = errorResponse.error;
            this.loading = false
      },
      complete: () => {}
    })
  }

  getCategoryListById(id: number){
    this.currentGroupId = id
    this.subCategoryGroupByIdList = this.categoryGroupRest.getCategoryGroupId(id).subscribe({
      next: (response) => {
        if (response.body) {
          this.showToEditCategoryGroupList = true
          this.serviceCategoryGroupById.emit(response.body.categories)
          this.loading = false
        }
        else{
          this.customError = 'Brak obiektu odpowiedzi'
          this.loading = false
          this.showToEditCategoryGroupList = true
        } 
      },
      error: (errorResponse) => {
            this.customError = errorResponse.error;
            this.loading = false
            this.showToEditCategoryGroupList = true
      },
      complete: () => {}
    })
  }
}
