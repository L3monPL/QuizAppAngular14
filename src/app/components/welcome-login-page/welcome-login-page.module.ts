import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeLoginPageComponent } from './welcome-login-page.component';



@NgModule({
  declarations: [
    WelcomeLoginPageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    WelcomeLoginPageComponent
  ]
})
export class WelcomeLoginPageModule { }
