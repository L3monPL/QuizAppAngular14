import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category, CategoryRestService } from '../category-rest.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryManagerRestService {

  categoryList?: Array<Category>

  subCategoryList?: Subscription
  customError?: string
  loading = true;

  serviceCategory: EventEmitter<any> = new EventEmitter();

  constructor(
    private categoryRestService: CategoryRestService
  ) { }

  getCategoryList(){
    this.subCategoryList = this.categoryRestService.getCategory().subscribe({
      next: (response) => {
        if (response.body) {
          this.categoryList = response.body
          // console.log(this.categoryList + "response this aaaa")
          this.serviceCategory.emit(response.body)
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

  


}
