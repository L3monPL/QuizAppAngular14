import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteCategoryGroupComponent } from './delete-category-group.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    DeleteCategoryGroupComponent
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
    DeleteCategoryGroupComponent
  ]
})
export class DeleteCategoryGroupModule { }
