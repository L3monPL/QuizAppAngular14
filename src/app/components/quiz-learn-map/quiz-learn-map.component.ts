import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexChart, ApexNonAxisChartSeries, ApexResponsive, ChartComponent } from 'ng-apexcharts';
import { CategoryManagerRestService } from 'src/app/services/components-services/category-manager-rest.service';
import { UserDataService } from 'src/app/services/global-services/user-data.service';
import { CategoryProgress } from 'src/app/services/user-rest.service';


export type ChartOptions = {
  series: ApexNonAxisChartSeries;
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

  userProgress?: Array<CategoryProgress>

  quizFinishQuizValueList: any = [2, 3,1]
  quizList?: any = ['html', 'css', 'javascript']

  
  @ViewChild("chart") chart?: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;


  constructor(
    public userData: UserDataService,
    private categoryManagerRest: CategoryManagerRestService
  ) { }

  ngOnInit(): void {
    this.chartLoading()
    this.takeValueToChart()
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

  takeValueToChart(){
    this.userProgress = this.userData.user?.userProgress.categoryProgress
    console.log(this.userProgress)

    this.categoryManagerRest.categoryList
    console.log(this.categoryManagerRest.categoryList)
  }

}
