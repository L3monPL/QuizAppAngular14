import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateQuizProfileComponent } from './create-quiz-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  {
    path: '',
    component: CreateQuizProfileComponent,
  },
];


@NgModule({
  declarations: [
    CreateQuizProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule
  ],
  exports: [
    CreateQuizProfileComponent
  ]
})
export class CreateQuizProfileModule { }
