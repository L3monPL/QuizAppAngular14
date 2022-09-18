import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickQuizPanelListComponent } from './quick-quiz-panel-list.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    QuickQuizPanelListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    QuickQuizPanelListComponent
  ]
})
export class QuickQuizPanelListModule { }
