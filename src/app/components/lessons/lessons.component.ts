import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category, CategoryRestService } from 'src/app/services/category-rest.service';
import { QuestionManagerRestService } from 'src/app/services/components-services/question-manager-rest.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit {

  idParam?: any

  subCategoryId?: Subscription
  categoryById?: Category
  customError?: string
  loading?: boolean

  constructor(
    private route: ActivatedRoute,
    public questionManagerService: QuestionManagerRestService,
    public categoryRestService : CategoryRestService
  ) { }

  ngOnInit(): void {
    this.loading = true
    this.takeValueFromUrl()
    this.getCategoryById()

  }

  takeValueFromUrl(){
    this.route.paramMap.subscribe(params => {
      this.idParam = params.get('code')
      this.questionManagerService.categoryId = this.idParam
      console.log(this.idParam);
    });
  }

  getCategoryById(){
    this.subCategoryId = this.categoryRestService.getCategoryId(this.idParam).subscribe({
      next: (response) => {
        if (response.body) {
          this.categoryById = response.body
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
