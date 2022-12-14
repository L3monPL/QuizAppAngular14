import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemindPasswordComponent } from './remind-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    RemindPasswordComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,  
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    RouterModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    RemindPasswordComponent
  ]
})
export class RemindPasswordModule { }
