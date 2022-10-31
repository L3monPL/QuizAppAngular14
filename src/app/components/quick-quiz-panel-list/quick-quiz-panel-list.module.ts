import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickQuizPanelListComponent } from './quick-quiz-panel-list.component';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [
    QuickQuizPanelListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule
  ],
  exports: [
    QuickQuizPanelListComponent
  ]
})
export class QuickQuizPanelListModule { }
