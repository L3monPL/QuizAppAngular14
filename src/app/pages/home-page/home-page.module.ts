import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { RouterModule, Routes } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { ProfileRightPanelModule } from 'src/app/components/profile-right-panel/profile-right-panel.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { CheckLoginGuard } from 'src/app/guards/check-login.guard';


const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard-page/dashboard-page.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile-page/profile-page.component').then(m => m.ProfilePageComponent),
      },
      { path: 'quiz-maps', 
      loadChildren: () => import('../quiz-maps-page/quiz-maps-page.module').then(m => m.QuizMapsPageModule),
      },
      {
        path: 'level',
        loadChildren: () => import('../../components/lessons-for-quiz/lessons-for-quiz.module').then(m => m.LessonsForQuizModule),
      },
      {
        path: 'admin-panel',
        loadChildren: () => import('../admin-panel-page/admin-panel-page.module').then(m => m.AdminPanelPageModule),
        canLoad: [CheckLoginGuard],
        canActivate: [CheckLoginGuard],
        canActivateChild: [CheckLoginGuard],
        data: {
          onlyAdmin: true,
        }
      },
      {
        path: 'ranking',
        loadChildren: () => import('../ranking-page/ranking-page.module').then(m => m.RankingPageModule),
      },
      {
        path: 'settings',
        loadChildren: () => import('../settings-page/settings-page.module').then(m => m.SettingsPageModule),
      },
    ]
  }
]

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    ProfileRightPanelModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule
  ],
  exports: [
    RouterModule
  ]
})
export class HomePageModule { }
