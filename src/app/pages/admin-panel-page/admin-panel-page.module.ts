import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelPageComponent } from './admin-panel-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';



const routes: Routes = [
  {
    path: '',
    component: AdminPanelPageComponent,
  },
];

@NgModule({
  declarations: [
    AdminPanelPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [
    AdminPanelPageComponent
  ]
})
export class AdminPanelPageModule { }
