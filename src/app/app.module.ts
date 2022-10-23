import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './components/login/login.module';
import { RemindPasswordModule } from './components/remind-password/remind-password.module';
import { RegisterModule } from './components/register/register.module';
import { WelcomeLoginPageModule } from './components/welcome-login-page/welcome-login-page.module';
import { HttpClientModule } from '@angular/common/http';
import { AppGlobalLoadingComponent } from './components/app-global-loading/app-global-loading.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AppGlobalLoadingComponent,    
    
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoginModule,
    RemindPasswordModule,
    RegisterModule,
    WelcomeLoginPageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
