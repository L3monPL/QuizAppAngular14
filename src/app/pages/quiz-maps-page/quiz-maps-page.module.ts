import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizMapsPageComponent } from './quiz-maps-page.component';
import { RouterModule, Routes } from '@angular/router';
import { QuizMapListModule } from 'src/app/components/quiz-map-list/quiz-map-list.module';
import { InformationAboutQuizMapModule } from 'src/app/components/information-about-quiz-map/information-about-quiz-map.module';

const routes: Routes = [
  {
    path: '',
    component: QuizMapsPageComponent,
  },
];

@NgModule({
  declarations: [
    QuizMapsPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    QuizMapListModule,
    InformationAboutQuizMapModule,
  ],
  exports: [
    QuizMapsPageComponent
  ]
})
export class QuizMapsPageModule { }
