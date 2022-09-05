import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRightPanelComponent } from './profile-right-panel.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    ProfileRightPanelComponent
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatCardModule,
    MatIconModule,
  ],
  exports: [
    ProfileRightPanelComponent
  ]
})
export class ProfileRightPanelModule { }
