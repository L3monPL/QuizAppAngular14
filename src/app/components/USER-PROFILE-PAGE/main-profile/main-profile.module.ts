import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MainProfileComponent } from './main-profile.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MainProfileComponent,
  },
];


@NgModule({
  declarations: [
    MainProfileComponent
  ],
  imports: [
    CommonModule,
    NgApexchartsModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    MainProfileComponent
  ]
})
export class MainProfileModule { }
