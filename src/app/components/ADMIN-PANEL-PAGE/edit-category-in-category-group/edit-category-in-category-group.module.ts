import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditCategoryInCategoryGroupComponent } from './edit-category-in-category-group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    EditCategoryInCategoryGroupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    FormsModule
  ],
  exports: [
    EditCategoryInCategoryGroupComponent
  ]
})
export class EditCategoryInCategoryGroupModule { }
