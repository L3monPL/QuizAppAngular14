import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetImagesListComponent } from './get-images-list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    GetImagesListComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  exports: [
    GetImagesListComponent
  ]
})
export class GetImagesListModule { }
