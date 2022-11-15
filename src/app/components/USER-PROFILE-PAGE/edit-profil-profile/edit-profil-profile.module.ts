import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfilProfileComponent } from './edit-profil-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

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
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    EditProfilProfileComponent
  ]
})
export class EditProfilProfileModule { }
