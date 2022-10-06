import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelPageComponent } from './admin-panel-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { AddQuestionModule } from 'src/app/components/ADMIN-PANEL-PAGE/add-question/add-question.module';
import { AddCategoryModule } from 'src/app/components/ADMIN-PANEL-PAGE/add-category/add-category.module';


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
    AddQuestionModule,
    AddCategoryModule
  ],
  exports: [
    AdminPanelPageComponent
  ]
})
export class AdminPanelPageModule { }
