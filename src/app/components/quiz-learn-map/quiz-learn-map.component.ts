import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexNonAxisChartSeries, ApexResponsive, ChartComponent } from 'ng-apexcharts';
import { Subscription } from 'rxjs';
import { CategoryGroup, CategoryGroupServiceService } from 'src/app/services/category-group-service.service';
import { Category } from 'src/app/services/category-rest.service';
import { CategoryManagerRestService } from 'src/app/services/components-services/category-manager-rest.service';
import { UserDataService } from 'src/app/services/global-services/user-data.service';
import { CategoryProgress } from 'src/app/services/user-rest.service';


export type ChartOptions = {
  series: string;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-quiz-learn-map',
  templateUrl: './quiz-learn-map.component.html',
  styleUrls: ['./quiz-learn-map.component.scss']
})
export class QuizLearnMapComponent implements OnInit {

  categoryGroup?: Array<CategoryGroup>
  subCategoryGroup?: Subscription
  customError?: string
  loading = false

  lvl1Finish?: number|string
  lvl2Finish?: number|string
  lvl3Finish?: number|string

  lvl1Max?: number|string
  lvl2Max?: number|string
  lvl3Max?: number|string

  sumLvlFinish?: number

  sumLvlMax?: number

  progressCategoryResult?: number

  categoryList?: Array<Category>
  selectedCategory?: Category
  userProgressCategory?: CategoryProgress

  userProgress?: Array<CategoryProgress>
  
  @ViewChild("chart") chart?: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  testArr?: any [] = []

  angularArray: any = []

  arrayWithLabelNames?: any [] = []

  arrayWithSumProgressResult?: any [] = []


  constructor(
    public userData: UserDataService,
    private categoryManagerRest: CategoryManagerRestService,
    private userDataService: UserDataService,
    private categroyGroupService: CategoryGroupServiceService
  ) { }

  ngOnInit(): void {
    this.getCategoryGroup()
    
    
  }

  chartLabelName(id: number){
    var arrayLabelNameToPush = []
    for (let index = 0; index < this.categoryGroup![id].categories.length; index++) {
      let currentLabelName = this.categoryGroup![id].categories[index].name
      // console.log(currentLabelName) 
      arrayLabelNameToPush.push(currentLabelName)
    }
    return arrayLabelNameToPush
  }



  chartId(id: number){
    var currentId = id
    for (let index = 0; index < id; index++) {
      currentId = currentId + 2
    }
    var arrayValueToPush = []
      
      for (let indexMap = 0; indexMap < 3; indexMap++) {
        arrayValueToPush.push(this.angularArray[currentId + indexMap])
      }
      
    // console.log(arrayValueToPush)
    return arrayValueToPush
    
  }

  chartLoading(){
    this.chartOptions = {
      chart: {
        type: "donut"
      },
      responsive: [
        {
          breakpoint: 30000,
          options: {
            chart: {
              width: 230,
              // height: 200
            },
            legend: {
              position: "bottom"
            }
          }
        },
        {
          breakpoint: 1600,
          options: {
            chart: {
              width: 200,
              // height: 200
            },
            legend: {
              position: "bottom"
            }
          }
        },
        {
          breakpoint: 1400,
          options: {
            chart: {
              width: 250,
              // height: 200
            },
            legend: {
              position: "bottom"
            }
          }
        },
        {
          breakpoint: 600,
          options: {
            chart: {
              width: 180,
              // height: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  takeValueToChart(id: number){
    this.userProgress = this.userData.user?.userProgress.categoryProgress
    // console.log(this.userProgress)

      this.userProgressCategory = this.userDataService.user?.userProgress.categoryProgress.find((obj) => {
        return obj.categoryId === id;
      });
      // console.log(this.userProgressCategory)

      let ok = this.userProgressCategory?.levelProgresses![0]

    if (this.userProgressCategory?.levelProgresses![0]) {
      this.lvl1Finish = this.userProgressCategory?.levelProgresses![0].finishedQuizzes
      this.lvl2Finish = this.userProgressCategory?.levelProgresses![1].finishedQuizzes
      this.lvl3Finish = this.userProgressCategory?.levelProgresses![2].finishedQuizzes

      this.lvl1Max = this.userProgressCategory?.levelProgresses![0].quizzesToFinish
      this.lvl2Max = this.userProgressCategory?.levelProgresses![1].quizzesToFinish
      this.lvl3Max = this.userProgressCategory?.levelProgresses![2].quizzesToFinish


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

    if (this.lvl1Finish >= this.lvl1Max) {
      this.lvl1Finish = this.lvl1Max
    }
    if (this.lvl2Finish >= this.lvl2Max) {
      this.lvl2Finish = this.lvl2Max
    }

    if (this.lvl3Finish >= this.lvl3Max) {
      this.lvl3Finish = this.lvl3Max
    }


    this.sumLvlFinish = this.lvl1Finish + this.lvl2Finish + this.lvl3Finish

    this.sumLvlMax = this.lvl1Max + this.lvl2Max + this.lvl3Max

    // console.log(this.sumLvlFinish)
    // console.log(this.sumLvlMax)

    this.progressCategoryResult = (this.sumLvlFinish / this.sumLvlMax) * 100

    // })
    // console.log(this.progressCategoryResult)

    if (this.progressCategoryResult == 0) {
      // this.showChart = false
    }
    if (this.progressCategoryResult !== 0) {
      // this.showChart = true
    }

    this.angularArray?.push(this.progressCategoryResult)

    // console.log(this.angularArray)
  
  }

  checkValueToShowChartOrHide(id: number){
    var sumcheckValueShow = 0
    let intiger = 0
    for (let index = 0; index < id; index++) {
      intiger = intiger + 3
    }
    sumcheckValueShow = this.angularArray[intiger] + this.angularArray[intiger+1] + this.angularArray[intiger+2]

    // console.log(this.angularArray[intiger], this.angularArray[intiger+1], this.angularArray[intiger+2])
    return sumcheckValueShow
  }


  // getInfoAboutCategoryFromList(){
  //   this.userProgress = this.userData.user?.userProgress.categoryProgress
  //   console.log(this.userProgress)

  //   // this.categoryManagerRest.categoryList
  //   this.categoryManagerRest.serviceCategory.subscribe(res => {
  //     console.log(this.categoryManagerRest.categoryList)
  //     this.categoryList = this.categoryManagerRest.categoryList


  //     this.selectedCategory = this.categoryList!.find((obj) => {
  //       return obj.id.toString() === '57';
  //     });
  //     // console.log(this.selectedCategory)

  //   })
  // }

  getCategoryGroup(){
    this.subCategoryGroup = this.categroyGroupService.getCategoryGroup().subscribe({
      next: (response) => {
        if (response.body) {
          this.categoryGroup = response.body
          // console.log(this.categoryGroup)
          this.chartLoading()

          for (let index = 0; index < this.categoryGroup!.length; index++) {
        
            for (let indexMap = 0; indexMap < this.categoryGroup![index].categories.length; indexMap++) {
              let currentValue = this.categoryGroup![index].categories[indexMap].id
              this.takeValueToChart(currentValue)
            }
            this.testArr?.push(this.chartId(index))
            this.arrayWithLabelNames?.push(this.chartLabelName(index))
          }

          for (let index = 0; index < this.categoryGroup!.length; index++) {
            this.arrayWithSumProgressResult?.push(this.checkValueToShowChartOrHide(index))
          }
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

