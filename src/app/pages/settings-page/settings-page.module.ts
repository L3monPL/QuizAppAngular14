import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsPageComponent } from './settings-page.component';
import { RouterModule, Routes } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';


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
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule
  ], 
  exports: [
    SettingsPageComponent
  ]
})
export class SettingsPageModule { }
