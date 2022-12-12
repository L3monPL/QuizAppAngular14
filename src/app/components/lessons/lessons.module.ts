import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonsComponent } from './lessons.component';
import {MatCardModule} from '@angular/material/card';
import { RouterModule, Routes } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { CheckLoginGuard } from 'src/app/guards/check-login.guard';
import { NgApexchartsModule } from 'ng-apexcharts';

const routes: Routes = [
  {
    path: '',
    component: LessonsComponent,
      canLoad: [CheckLoginGuard],
      canActivate: [CheckLoginGuard],
      canActivateChild: [CheckLoginGuard],
  },
]

@NgModule({
  declarations: [
    LessonsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule,
    RouterModule.forChild(routes),
    MatIconModule,
    NgApexchartsModule,
  ],
  exports: [
    LessonsComponent
  ]
})
export class LessonsModule { }
