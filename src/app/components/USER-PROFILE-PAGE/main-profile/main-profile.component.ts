import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexChart, ApexNonAxisChartSeries, ApexResponsive, ChartComponent } from 'ng-apexcharts';
import { UserDataService } from 'src/app/services/global-services/user-data.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};


@Component({
  selector: 'app-main-profile',
  templateUrl: './main-profile.component.html',
  styleUrls: ['./main-profile.component.scss']
})
export class MainProfileComponent implements OnInit {

  quizList?: any
  quizFinishQuizValueList: any = []

  @ViewChild("chart") chart?: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  constructor(
    public userData: UserDataService
  ) {
    
   }

  ngOnInit(): void {
    this.getNamesOfQuiz()
    this.getValueOfQuiz()
    this.chartLoading()
  }

  chartLoading(){
    this.chartOptions = {
      series: this.quizFinishQuizValueList,
      chart: {
        type: "donut"
      },
      labels: this.quizList,
      responsive: [
        {
          breakpoint: 1600,
          options: {
            chart: {
              width: 260,
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
              width: 400,
              height: 300
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
              width: 200,
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

  getNamesOfQuiz(){
    let userProgress = this.userData.user?.userProgress.categoryProgress

      let quizNames = userProgress!.map(item => {
        return item.categoryName;
      })

    console.log(userProgress)
    this.quizList = quizNames
  }

  getValueOfQuiz(){
    let userProgress = this.userData.user?.userProgress.categoryProgress

    let currentEasy: number
    let currentMedium: number
    let currentHard: number

    let currentAllValue: number

    let quizNames = userProgress!.map(item => {
      let quizEasy = item.levelProgresses![0]
      let quizMedium = item.levelProgresses![1]
      let quizHard = item.levelProgresses![2]
      let quizEasyFinishedQuizzes = quizEasy?.finishedQuizzes
      let quizMediumFinishedQuizzes = quizMedium?.finishedQuizzes
      let quizHardFinishedQuizzes = quizHard?.finishedQuizzes

      // --------------------------------------------------
      if (quizEasyFinishedQuizzes == undefined) {
        currentEasy = 0
      }
      let quizEasyFinishedQuizzesValue0 = Number(quizEasyFinishedQuizzes);
      if (quizEasyFinishedQuizzesValue0 >= 4) {
        currentEasy = 4
      }
      if (quizEasyFinishedQuizzesValue0 < 4) {
        currentEasy = quizEasyFinishedQuizzesValue0
      }
      // --------------------------------------------------

      if (quizMediumFinishedQuizzes == undefined) {
        currentMedium = 0
      }
      let quizEasyFinishedQuizzesValue1 = Number(quizMediumFinishedQuizzes);
      if (quizEasyFinishedQuizzesValue1 >= 4) {
        currentMedium = 4
      }
      if (quizEasyFinishedQuizzesValue1 < 4) {
        currentMedium = quizEasyFinishedQuizzesValue1
      }
      // --------------------------------------------------

      if (quizHardFinishedQuizzes == undefined) {
        currentHard = 0
      }
      let quizEasyFinishedQuizzesValue2 = Number(quizHardFinishedQuizzes);
      if (quizEasyFinishedQuizzesValue2 >= 4) {
        currentHard = 4
      }
      if (quizEasyFinishedQuizzesValue2 < 4) {
        currentHard = quizEasyFinishedQuizzesValue2
      }
      // --------------------------------------------------

      currentAllValue = currentEasy + currentMedium + currentHard

      // console.log(currentEasy)
      // console.log(currentMedium)
      // console.log(currentHard)
      console.log(currentAllValue)

      this.quizFinishQuizValueList.push(currentAllValue!)

    })

    console.log(this.quizFinishQuizValueList!)
  }

}
