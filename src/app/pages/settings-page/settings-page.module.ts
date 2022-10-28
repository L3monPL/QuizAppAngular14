import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsPageComponent } from './settings-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SettingsPageComponent,
  },
];

@NgModule({
  declarations: [
    SettingsPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ], 
  exports: [
    SettingsPageComponent
  ]
})
export class SettingsPageModule { }
