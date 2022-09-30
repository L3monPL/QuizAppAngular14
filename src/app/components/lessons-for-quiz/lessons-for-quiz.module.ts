import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonsForQuizComponent } from './lessons-for-quiz.component';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from '../quiz/quiz.component';
import { QuizModule } from '../quiz/quiz.module';

const routes: Routes = [
  {
    path: ':code',
    component: LessonsForQuizComponent,
    children: [
      {
        path: '',
        // component: QuizComponent
        loadChildren: () => import('../../components/quiz/quiz.module').then(m => m.QuizModule),
      },
      {
        path: ':code',
        // component: QuizComponent
        loadChildren: () => import('../../components/quiz/quiz.module').then(m => m.QuizModule),
      },
    ]
  }
]

@NgModule({
  declarations: [
    LessonsForQuizComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    QuizModule
  ],
  exports: [
    LessonsForQuizComponent
  ]
})
export class LessonsForQuizModule { }
