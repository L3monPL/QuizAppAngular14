import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApexChart, ApexNonAxisChartSeries, ApexResponsive, ChartComponent } from 'ng-apexcharts';
import { Subscription } from 'rxjs';
import { Category, CategoryRestService } from 'src/app/services/category-rest.service';
import { QuestionManagerRestService } from 'src/app/services/components-services/question-manager-rest.service';
import { UserDataService } from 'src/app/services/global-services/user-data.service';
import { CategoryProgress, LevelProgresses, UserList } from 'src/app/services/user-rest.service';


export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit {

  quizList?: any
  quizFinishQuizValueList: any = []

  @ViewChild("chart") chart?: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  user?: UserList

  currentUserProgressToCategory?: CategoryProgress

  lvlEasy?: LevelProgresses
  easyPercent?: number|string

  lvlMedium?: LevelProgresses
  mediumPercent?: number|string
  mediumEnable?: boolean

  lvlHard?: LevelProgresses
  hardPercent?: number|string
  hardEnable?: boolean

  idParam?: any

  subCategoryId?: Subscription
  categoryById?: Category
  customError?: string
  loading?: boolean

  constructor(
    private route: ActivatedRoute,
    public questionManagerService: QuestionManagerRestService,
    public categoryRestService : CategoryRestService,
    public userDataService: UserDataService
  ) { }

  ngOnInit(): void {
    this.loading = true
    this.takeValueFromUrl()
    this.getCategoryById()
    this.checkUser()
    this.chartLoading()
  }

  takeValueFromUrl(){
    this.route.paramMap.subscribe(params => {
      this.idParam = params.get('code')
      this.questionManagerService.categoryId = this.idParam
      // console.log(this.idParam);
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

  checkUser(){
    // console.log(this.userDataService.user?.userProgress.categoryProgress)
    // console.log(this.idParam)

    this.currentUserProgressToCategory = this.userDataService.user?.userProgress.categoryProgress.find((obj) => {
      return obj.categoryId.toString() === this.idParam;
    });
    // console.log(this.currentUserProgressToCategory)

    this.lvlEasy = this.currentUserProgressToCategory?.levelProgresses![0]
    this.lvlMedium = this.currentUserProgressToCategory?.levelProgresses![1]
    this.lvlHard = this.currentUserProgressToCategory?.levelProgresses![2]
    // console.log(this.lvlEasy)
    // console.log(this.lvlMedium)
    // console.log(this.lvlHard)
    this.checkLvlEasy()
    this.checkLvlMedium()
    this.checkLvlHard()
  }

  checkLvlEasy(){
    if (this.lvlEasy?.levelCompleted == undefined) {
      this.easyPercent = "Rozpocznij!"
    }
    if (this.lvlEasy?.levelCompleted == false) {
      if (this.lvlEasy?.finishedQuizzes == '0') {
        this.easyPercent = "Kontynuuj"
      }
      else if (this.lvlEasy?.finishedQuizzes !== '0') {
        let finishedQuizzes = this.lvlEasy?.finishedQuizzes!;
        let x: number = +finishedQuizzes;

        let quizzesToFinish = this.lvlEasy?.quizzesToFinish!;
        let y: number = +quizzesToFinish;

        this.easyPercent = (x/y)*100 
        this.easyPercent = this.easyPercent + '%'
        // console.log(this.easyPercent)        
      }
    }
    if (this.lvlEasy?.levelCompleted == true) {
      this.easyPercent = "Ukończone"
    }
  }

  checkLvlMedium(){
    if (this.lvlMedium?.levelCompleted == undefined) {
      this.mediumPercent = "Zablokowane!"
      this.mediumEnable = false
    }
    if (this.lvlMedium?.levelCompleted == false) {
      if (this.lvlMedium?.finishedQuizzes == '0') {
        if (this.lvlEasy?.levelCompleted == false) {
          this.mediumPercent = "Zablokowane!"
          this.mediumEnable = false
        }
        
      }
      if (this.lvlMedium?.finishedQuizzes == '0') {
        if (this.lvlEasy?.levelCompleted == true) {
          this.mediumPercent = "Kontynuuj"
          this.mediumEnable = true
        }
      }
      else if (this.lvlMedium?.finishedQuizzes !== '0') {
        let finishedQuizzes = this.lvlMedium?.finishedQuizzes!;
        let x: number = +finishedQuizzes;

        let quizzesToFinish = this.lvlMedium?.quizzesToFinish!;
        let y: number = +quizzesToFinish;

        this.mediumPercent = (x/y)*100 
        this.mediumPercent = this.mediumPercent + '%'
        // console.log(this.mediumPercent)  
        this.mediumEnable = true      
      }
    }
    if (this.lvlMedium?.levelCompleted == true) {
      this.mediumPercent = "Ukończone"
      this.mediumEnable = true
    }
  }

  checkLvlHard(){
    if (this.lvlHard?.levelCompleted == undefined) {
      this.hardPercent = "Zablokowane!"
      this.hardEnable = false
    }
    if (this.lvlHard?.levelCompleted == false) {
      if (this.lvlHard?.finishedQuizzes == '0') {
        if (this.lvlMedium?.levelCompleted == false) {
          this.hardPercent = "Zablokowane!"
          this.hardEnable = false
        }
        
      }
      if (this.lvlHard?.finishedQuizzes == '0') {
        if (this.lvlMedium?.levelCompleted) {
          this.hardPercent = "Kontynuuj"
          this.hardEnable = true
        }
      }
      else if (this.lvlHard?.finishedQuizzes !== '0') {
        let finishedQuizzes = this.lvlHard?.finishedQuizzes!;
        let x: number = +finishedQuizzes;

        let quizzesToFinish = this.lvlHard?.quizzesToFinish!;
        let y: number = +quizzesToFinish;

        this.hardPercent = (x/y)*100 
        this.hardPercent = this.hardPercent + '%'
        // console.log(this.hardPercent)  
        this.hardEnable = true      
      }
    }
    if (this.lvlHard?.levelCompleted == true) {
      this.hardPercent = "Ukończone"
      this.hardEnable = true
    }
  }
  
  chartLoading(){
    this.chartOptions = {
      series: [1,1,1],
      chart: {
        type: "donut"
      },
      labels: ['Łatwy', 'Średni', 'Trudny'],
      responsive: [
        {
          breakpoint: 3000,
          options: {
            chart: {
              width: 360,
              // height: 200
            },
            legend: {
              position: "top"
            }
          }
        },
        {
          breakpoint: 1400,
          options: {
            chart: {
              width: 400,
              height: 300
            },
            legend: {
              position: "top"
            }
          }
        },
        {
          breakpoint: 600,
          options: {
            chart: {
              width: 200,
              // height: 200
            },
            legend: {
              position: "top"
            }
          }
        }
      ]
    };
  }
  

}
