import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatTimePipe, QuizComponent } from './quiz.component';
import { RouterModule, Routes } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';

const routes: Routes = [
  {
    path: '',
    component: QuizComponent,
  },
];

@NgModule({
  declarations: [
    QuizComponent,
    FormatTimePipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatProgressBarModule
  ],
  exports: [
    QuizComponent
  ]
})
export class QuizModule { }
