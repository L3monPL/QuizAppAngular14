import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizMapListComponent } from './quiz-map-list.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    QuizMapListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    QuizMapListComponent
  ]
})
export class QuizMapListModule { }
