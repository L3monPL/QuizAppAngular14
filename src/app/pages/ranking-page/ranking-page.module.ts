import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankingPageComponent } from './ranking-page.component';
import { RouterModule, Routes } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

const routes: Routes = [
  {
    path: '',
    component: RankingPageComponent,
  },
];


@NgModule({
  declarations: [
    RankingPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    RankingPageComponent
  ]
})
export class RankingPageModule { }
