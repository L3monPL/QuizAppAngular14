import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonsComponent } from './lessons.component';
import {MatCardModule} from '@angular/material/card';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LessonsComponent,
    
  },
]

@NgModule({
  declarations: [
    LessonsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    LessonsComponent
  ]
})
export class LessonsModule { }
