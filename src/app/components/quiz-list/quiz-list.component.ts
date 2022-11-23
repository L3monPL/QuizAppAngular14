import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category, CategoryRestService } from 'src/app/services/category-rest.service';
import { CategoryManagerRestService } from 'src/app/services/components-services/category-manager-rest.service';
import { UserDataService } from 'src/app/services/global-services/user-data.service';
import { CategoryProgress } from 'src/app/services/user-rest.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  userProgressList?: CategoryProgress

  objekt?: any


  constructor(
    // public categoryRest: CategoryRestService
    public categoryManagerService: CategoryManagerRestService,
    public userDataService: UserDataService
  ) { }

  ngOnInit(): void {
    // this.checkProgress()
    this.showProgress(49)
  }


  // checkProgress(){
  //   this.userProgressList = this.userDataService.user?.userProgress.categoryProgress
  //   console.log(this.userProgressList)
  // }

  showProgress(id: number){
    this.userProgressList = this.userDataService.user?.userProgress.categoryProgress.find((obj) => {
      this.objekt = obj.categoryId === id
       return this.objekt
    })
    // this.userProgressList = this.userDataService.user?.userProgress.categoryProgress
    if (this.userProgressList?.levelProgresses[0]) {
      
    }
    // else if(this.userProgressList!.levelProgresses[0].finishedQuizzes !== undefined){
      // console.log(this.userProgressList?.levelProgresses[0].finishedQuizzes)
      // console.log(this.userProgressList?.levelProgresses[1].finishedQuizzes)
      // console.log(this.userProgressList?.levelProgresses[2].finishedQuizzes)
  
      // console.log(this.userProgressList?.levelProgresses[0].quizzesToFinish)
      // console.log(this.userProgressList?.levelProgresses[1].quizzesToFinish)
      // console.log(this.userProgressList?.levelProgresses[2].quizzesToFinish)
    // }
    
    console.log(this.objekt)
  }



 

}
