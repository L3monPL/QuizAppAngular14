import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './profile-page.component';
import { RouterModule, Routes } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MainProfileModule } from 'src/app/components/USER-PROFILE-PAGE/main-profile/main-profile.module';
import { AchievementsProfileModule } from 'src/app/components/USER-PROFILE-PAGE/achievements-profile/achievements-profile.module';

const routes: Routes = [
  {
    path: '',
    component: ProfilePageComponent,
    children: [
      {
        path: 'main',
        loadChildren: () => import('../../components/USER-PROFILE-PAGE/main-profile/main-profile.module').then(m => m.MainProfileModule)
      },
      {
        path: 'achievements',
        loadChildren: () => import('../../components/USER-PROFILE-PAGE/achievements-profile/achievements-profile.module').then(m => m.AchievementsProfileModule)
      },
      {
        path: 'create-quiz',
        loadChildren: () => import('../../components/USER-PROFILE-PAGE/create-quiz-profile/create-quiz-profile.module').then(m => m.CreateQuizProfileModule)
      },
      {
        path: 'edit-quiz',
        loadChildren: () => import('../../components/USER-PROFILE-PAGE/edit-quiz-profile/edit-quiz-profile.module').then(m => m.EditQuizProfileModule)
      },
      {
        path: 'edit-profile',
        loadChildren: () => import('../../components/USER-PROFILE-PAGE/edit-profil-profile/edit-profil-profile.module').then(m => m.EditProfilProfileModule)
      },
    ]
  },
];

@NgModule({
  declarations: [
    ProfilePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgApexchartsModule,
    // MainProfileModule,
    // AchievementsProfileModule
  ],
  exports: [
    ProfilePageComponent
  ]
})
export class ProfilePageModule { }
