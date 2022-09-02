import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { RouterModule, Routes } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { ProfileRightPanelModule } from 'src/app/components/profile-right-panel/profile-right-panel.module';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    // children: [
    //   {
    //     path: 'negotiations',
    //     loadChildren: () => import('../negotiations-page/negotiations-page.module').then(m => m.NegotiationsPageModule)
    //   },
    // ]
  }
]

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    ProfileRightPanelModule,
  ],
  exports: [
    RouterModule
  ]
})
export class HomePageModule { }
