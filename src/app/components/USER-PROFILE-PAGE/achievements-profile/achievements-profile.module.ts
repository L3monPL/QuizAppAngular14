import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AchievementsProfileComponent } from './achievements-profile.component';
import { RouterModule, Routes } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

const routes: Routes = [
  {
    path: '',
    component: AchievementsProfileComponent,
  },
];


@NgModule({
  declarations: [
    AchievementsProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule
  ],
  exports: [
    AchievementsProfileComponent
  ]
})
export class AchievementsProfileModule { }
