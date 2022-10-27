import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetUsersListComponent } from './get-users-list.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    GetUsersListComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    GetUsersListComponent
  ]
})
export class GetUsersListModule { }
