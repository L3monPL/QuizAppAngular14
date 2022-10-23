import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankingPageComponent } from './ranking-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: RankingPageComponent,
  },
];


@NgModule({
  declarations: [
    RankingPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RankingPageComponent
  ]
})
export class RankingPageModule { }
