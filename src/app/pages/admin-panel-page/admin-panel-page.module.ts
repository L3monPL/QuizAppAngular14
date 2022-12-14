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
import { DeleteCategoryModule } from 'src/app/components/ADMIN-PANEL-PAGE/delete-category/delete-category.module';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import { GetUsersListModule } from 'src/app/components/ADMIN-PANEL-PAGE/get-users-list/get-users-list.module';
import { DeleteUserModule } from 'src/app/components/ADMIN-PANEL-PAGE/delete-user/delete-user.module';
import { EditCategoryModule } from 'src/app/components/ADMIN-PANEL-PAGE/edit-category/edit-category.module';
import { GetImagesListModule } from 'src/app/components/ADMIN-PANEL-PAGE/get-images-list/get-images-list.module';
import { DeleteImageModule } from 'src/app/components/ADMIN-PANEL-PAGE/delete-image/delete-image.module';
import { AddImageModule } from 'src/app/components/ADMIN-PANEL-PAGE/add-image/add-image.module';
import { EditUserModule } from 'src/app/components/ADMIN-PANEL-PAGE/edit-user/edit-user.module';
import { EditQuestionModule } from 'src/app/components/ADMIN-PANEL-PAGE/edit-question/edit-question.module';
import { AddCategoryGroupModule } from 'src/app/components/ADMIN-PANEL-PAGE/add-category-group/add-category-group.module';
import { DeleteCategoryGroupModule } from 'src/app/components/ADMIN-PANEL-PAGE/delete-category-group/delete-category-group.module';
import { EditCategoryGroupModule } from 'src/app/components/ADMIN-PANEL-PAGE/edit-category-group/edit-category-group.module';
import { EditCategoryInCategoryGroupModule } from 'src/app/components/ADMIN-PANEL-PAGE/edit-category-in-category-group/edit-category-in-category-group.module';
import { AddEditDeleteAchievementModule } from 'src/app/components/ADMIN-PANEL-PAGE/add-edit-delete-achievement/add-edit-delete-achievement.module';


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
    AddCategoryModule,
    DeleteCategoryModule,
    MatExpansionModule,
    MatIconModule,
    GetUsersListModule,
    DeleteUserModule,
    EditCategoryModule,
    GetImagesListModule,
    DeleteImageModule,
    AddImageModule,
    EditUserModule,
    EditQuestionModule,
    AddCategoryGroupModule,
    DeleteCategoryGroupModule,
    EditCategoryGroupModule,
    EditCategoryInCategoryGroupModule,
    AddEditDeleteAchievementModule
  ],
  exports: [
    AdminPanelPageComponent
  ]
})
export class AdminPanelPageModule { }
