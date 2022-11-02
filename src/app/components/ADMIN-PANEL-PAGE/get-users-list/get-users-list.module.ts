import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetUsersListComponent } from './get-users-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    GetUsersListComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  exports: [
    GetUsersListComponent
  ]
})
export class GetUsersListModule { }
