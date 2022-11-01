import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category, CategoryRestService } from '../category-rest.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryManagerRestService {

  private PATH = 'https://wsblearn-api.azurewebsites.net/api'

  categoryList?: Array<Category>

  subCategoryList?: Subscription
  customError?: string


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
        }
        else{
          this.customError = 'Brak obiektu odpowiedzi'
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
      },
      complete: () => {}
    })
  }

  


}
