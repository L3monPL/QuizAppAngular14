import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditDeleteAchievementComponent } from './add-edit-delete-achievement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [
    AddEditDeleteAchievementComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatIconModule
  ],
  exports: [
    AddEditDeleteAchievementComponent
  ]
})
export class AddEditDeleteAchievementModule { }
