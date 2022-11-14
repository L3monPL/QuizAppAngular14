import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfilProfileComponent } from './edit-profil-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  {
    path: '',
    component: EditProfilProfileComponent,
  },
];

@NgModule({
  declarations: [
    EditProfilProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule
  ],
  exports: [
    EditProfilProfileComponent
  ]
})
export class EditProfilProfileModule { }
