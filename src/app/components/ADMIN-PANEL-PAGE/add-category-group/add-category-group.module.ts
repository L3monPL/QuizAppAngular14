import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCategoryGroupComponent } from './add-category-group.component';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddCategoryGroupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  exports: [
    AddCategoryGroupComponent
  ]
})
export class AddCategoryGroupModule { }
