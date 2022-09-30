import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category, CategoryRestService } from 'src/app/services/category-rest.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit, OnDestroy {

  quizList = [
    {
      name: 'JavaScript',
      icon: '../../../assets/js.png',
      type: 'Front-end',
      progresValue: 75,
      link: '/home/quiz/1'
    },
    {
      name: 'CSS',
      icon: '../../../assets/css.png',
      type: 'Front-end',
      progresValue: 55,
      link: '/home/quiz/2'
    },
    {
      name: 'HTML',
      icon: '../../../assets/html.png',
      type: 'Front-end',
      progresValue: 85,
      link: '/home/quiz/3'
    },
    {
      name: 'C#',
      icon: '../../../assets/csharp.png',
      type: 'Back-end',
      progresValue: 95,
      link: '/home/quiz/4'
    },
    {
      name: 'SQL',
      icon: '../../../assets/sql.png',
      type: 'Back-end',
      progresValue: 25,
      link: '/home/quiz/5'
    },
    {
      name: 'C++',
      icon: '../../../assets/c++.png',
      type: 'Back-end',
      progresValue: 45,
      link: '/home/quiz/6'
    },
    {
      name: 'Python',
      icon: '../../../assets/python.png',
      type: 'Back-end',
      progresValue: 5,
      link: '/home/quiz/7'
    },

  ]
  categoryList?: Array<Category>

  subCategoryList?: Subscription
  customError?: string

  constructor(
    public categoryRest: CategoryRestService
  ) { }

  ngOnInit(): void {
    this.getCategoryList()
  }
  ngOnDestroy(): void {
    this.subCategoryList?.unsubscribe()
  }

  getCategoryList(){
    this.subCategoryList = this.categoryRest.getCategory().subscribe({
      next: (response) => {
        if (response.body) {
          this.categoryList = response.body
          console.log(this.categoryList)
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
