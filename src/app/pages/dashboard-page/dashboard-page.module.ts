import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './dashboard-page.component';
import { RouterModule, Routes } from '@angular/router';
import { QuickQuizPanelListModule } from 'src/app/components/quick-quiz-panel-list/quick-quiz-panel-list.module';

const routes: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
  }
];

@NgModule({
  declarations: [
    DashboardPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    QuickQuizPanelListModule,
  ]
})
export class DashboardPageModule { }
