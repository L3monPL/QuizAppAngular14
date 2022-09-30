import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonsComponent } from './lessons.component';



@NgModule({
  declarations: [
    LessonsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LessonsComponent
  ]
})
export class LessonsModule { }
