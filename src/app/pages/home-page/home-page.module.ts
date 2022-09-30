import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { RouterModule, Routes } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { ProfileRightPanelModule } from 'src/app/components/profile-right-panel/profile-right-panel.module';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard-page/dashboard-page.module').then(m => m.DashboardPageModule)
      },
      { path: 'quiz-maps', 
      loadChildren: () => import('../quiz-maps-page/quiz-maps-page.module').then(m => m.QuizMapsPageModule),
      },
      {
        path: 'lessons',
        loadChildren: () => import('../../components/lessons-for-quiz/lessons-for-quiz.module').then(m => m.LessonsForQuizModule),
      },
    ]
  }
]

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    ProfileRightPanelModule,
  ],
  exports: [
    RouterModule
  ]
})
export class HomePageModule { }
