import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexChart, ApexNonAxisChartSeries, ApexResponsive, ChartComponent } from 'ng-apexcharts';

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

  @ViewChild("chart") chart?: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [87, 55, 13, 43, 22],
      chart: {
        type: "donut"
      },
      labels: ["HTML", "CSS", "C#", "JS", "PYTHON"],
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

  ngOnInit(): void {
  }

}
