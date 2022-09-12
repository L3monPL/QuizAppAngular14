import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizListComponent } from './quiz-list.component';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    QuizListComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
  ],
  exports: [
    QuizListComponent
  ]
})
export class QuizListModule { }
