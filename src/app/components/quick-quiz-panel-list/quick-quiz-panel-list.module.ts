import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickQuizPanelListComponent } from './quick-quiz-panel-list.component';



@NgModule({
  declarations: [
    QuickQuizPanelListComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    QuickQuizPanelListComponent
  ]
})
export class QuickQuizPanelListModule { }
