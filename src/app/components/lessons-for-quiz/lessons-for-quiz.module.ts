import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonsForQuizComponent } from './lessons-for-quiz.component';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from '../quiz/quiz.component';
import { QuizModule } from '../quiz/quiz.module';
import { LessonsComponent } from '../lessons/lessons.component';

// const routes: Routes = [
//   {
//     path: '',
//     component: LessonsForQuizComponent,
//     children: [
//       {
//         path: ':code',
//         component: LessonsComponent
//       },
//       {
//         path: ':code/:code',
//         loadChildren: () => import('../../components/quiz/quiz.module').then(m => m.QuizModule),
//       },
//     ]
//   },
//   { path: '**',   redirectTo: ':code/:code', pathMatch: 'full' }
// ]
const routes: Routes = [
  {
    path: ':code',
    // component: LessonsComponent,
    loadChildren: () => import('../../components/lessons/lessons.module').then(m => m.LessonsModule),
    
  },
  {
    path: ':code/:code',
    loadChildren: () => import('../../components/quiz/quiz.module').then(m => m.QuizModule),
    
  },
  { path: '**',   redirectTo: '/home', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    LessonsForQuizComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    // QuizModule
  ],
  exports: [
    LessonsForQuizComponent,
    RouterModule
  ]
})
export class LessonsForQuizModule { }
