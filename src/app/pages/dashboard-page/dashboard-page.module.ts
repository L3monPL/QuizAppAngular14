import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './dashboard-page.component';
import { RouterModule, Routes } from '@angular/router';
import { QuickQuizPanelListModule } from 'src/app/components/quick-quiz-panel-list/quick-quiz-panel-list.module';
import { QuizListModule } from 'src/app/components/quiz-list/quiz-list.module';
import { QuizLearnMapModule } from 'src/app/components/quiz-learn-map/quiz-learn-map.module';
import { CheckLoginGuard } from 'src/app/guards/check-login.guard';


const routes: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
    canLoad: [CheckLoginGuard],
    canActivate: [CheckLoginGuard],
    canActivateChild: [CheckLoginGuard],
  },
];

@NgModule({
  declarations: [
    DashboardPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    QuickQuizPanelListModule,
    QuizListModule,
    QuizLearnMapModule,
  ]
})
export class DashboardPageModule { }
