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

  lvl1Finish?: number|string
  lvl2Finish?: number|string
  lvl3Finish?: number|string

  lvl1Max?: number|string
  lvl2Max?: number|string
  lvl3Max?: number|string

  sumLvlFinish?: number

  sumLvlMax?: number

  progressCategoryResult?: number


  constructor(
    // public categoryRest: CategoryRestService
    public categoryManagerService: CategoryManagerRestService,
    public userDataService: UserDataService
  ) { }

  ngOnInit(): void {
    // this.checkProgress()
    // this.showProgress(52)
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
    let ok = this.userProgressList?.levelProgresses![0]

    if (this.userProgressList?.levelProgresses![0]) {
      this.lvl1Finish = this.userProgressList?.levelProgresses![0].finishedQuizzes
      this.lvl2Finish = this.userProgressList?.levelProgresses![1].finishedQuizzes
      this.lvl3Finish = this.userProgressList?.levelProgresses![2].finishedQuizzes

      this.lvl1Max = this.userProgressList?.levelProgresses![0].quizzesToFinish
      this.lvl2Max = this.userProgressList?.levelProgresses![1].quizzesToFinish
      this.lvl3Max = this.userProgressList?.levelProgresses![2].quizzesToFinish
    }
    
    if(ok?.finishedQuizzes == undefined){
      this.lvl1Finish = '0'
      this.lvl2Finish = '0'
      this.lvl3Finish = '0'

      this.lvl1Max = '4'
      this.lvl2Max = '4'
      this.lvl3Max = '4'
    }

    let l1f = this.lvl1Finish!
    let y1f: number = +l1f;
    this.lvl1Finish = y1f

    let l2f = this.lvl2Finish!
    let y2f: number = +l2f;
    this.lvl2Finish = y2f

    let l3f = this.lvl3Finish!
    let y3f: number = +l3f;
    this.lvl3Finish = y3f

    let l1m = this.lvl1Max!
    let y1m: number = +l1m;
    this.lvl1Max = y1m

    let l2m = this.lvl1Max!
    let y2m: number = +l2m;
    this.lvl2Max = y2m

    let l3m = this.lvl1Max!
    let y3m: number = +l3m;
    this.lvl3Max = y3m

    


    this.sumLvlFinish = this.lvl1Finish + this.lvl2Finish + this.lvl3Finish

    this.sumLvlMax = this.lvl1Max + this.lvl2Max + this.lvl3Max

    // console.log(this.sumLvlFinish)
    // console.log(this.sumLvlMax)

    this.progressCategoryResult = (this.sumLvlFinish / this.sumLvlMax) * 100

    // console.log(this.progressCategoryResult)

    return this.progressCategoryResult
  }



 

}
