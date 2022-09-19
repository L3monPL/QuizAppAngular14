import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizLearnMapComponent } from './quiz-learn-map.component';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    QuizLearnMapComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
  ],
  exports: [
    QuizLearnMapComponent
  ]
})
export class QuizLearnMapModule { }
