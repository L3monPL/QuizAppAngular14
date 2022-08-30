import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { HeaderModule } from 'src/app/components/header/header.module';
import { RouterModule, Routes } from '@angular/router';

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
    HeaderModule
  ],
  exports: [
    RouterModule
  ]
})
export class HomePageModule { }
