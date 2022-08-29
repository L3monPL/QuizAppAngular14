import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RemindPasswordComponent } from './components/remind-password/remind-password.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'remind-password',
        component: RemindPasswordComponent,
      },
    ]},
    { path: 'home', loadChildren: () => import('./pages/home-page/home-page.module').then(m => m.HomePageModule),
    // canLoad: [CheckLoginGuardGuard],
    // canActivate: [CheckLoginGuardGuard],
    // canActivateChild: [CheckLoginGuardGuard],
    // data: {
    //   onlyAdmin: false,
    // }
  },
  { path: '**',   redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
