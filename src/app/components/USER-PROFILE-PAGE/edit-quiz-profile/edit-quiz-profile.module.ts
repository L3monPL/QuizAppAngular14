import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditQuizProfileComponent } from './edit-quiz-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  {
    path: '',
    component: EditQuizProfileComponent,
  },
];


@NgModule({
  declarations: [
    EditQuizProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule
  ],
  exports: [
    EditQuizProfileComponent
  ]
})
export class EditQuizProfileModule { }
