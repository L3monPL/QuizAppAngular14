import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';
import { CheckLoginGuard } from 'src/app/guards/check-login.guard';
import { Achievement, AchievementRestService } from 'src/app/services/achievement-rest.service';
import { CategoryRestService } from 'src/app/services/category-rest.service';
import { UserManagerRestService } from 'src/app/services/components-services/user-manager-rest.service';
import { UserDataService } from 'src/app/services/global-services/user-data.service';
import { UserList } from 'src/app/services/user-rest.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  menuMode: MatDrawerMode = 'side';
  mobileMenuMode: MatDrawerMode = 'over';
  menushow?: boolean = true
  mobileMenuShow?: boolean = false
  smallRightPanel = false
  mobileView?: boolean

  helper = new JwtHelperService();
  userIdFromToken?: number

  obj0 = Array<any>()

  subsProgressBar?: Subscription
  userProgressUpdate?: UserList

  subAchievementList?: Subscription
  customErrorAchievementList?: string
  achievementList?: Array<Achievement>

  subAchievementAddFirstCategoryUnlockToUser?: Subscription

  @ViewChild('drawer') input!: MatDrawer
  @ViewChild('mobileDrawer') mobileDrawer!: MatDrawer

  @HostListener('window:resize', ['$event'])
     onResize(event: any){
      this.setSizeOptions(window.innerWidth)
   }


  constructor(
    private router: Router,
    public userDataService: UserDataService,
    private userManagerService: UserManagerRestService,
    private achievementRest: AchievementRestService
    ) { }

  ngOnInit(): void {

    if(this.router.url === '/home')
    {
      this.router.navigate(['./home/dashboard'])
    }

    // this.smallRightPanel = false
    if(window.innerWidth < 1400){
      // this.menuMode = 'side';
      this.menushow = false
      this.smallRightPanel = true
     }
     if(window.innerWidth < 800){
      // this.menuMode = 'side';
      this.menushow = false
      this.smallRightPanel = false
     }

     this.setSizeOptions(window.innerWidth)

     this.userManagerService.checkUserProgress()
     this.subscribeUserRest()
  }

  subscribeUserRest(){
    this.subsProgressBar = this.userManagerService.serviceCurrentUser.subscribe(
      res => {
        this.userProgressUpdate = res
        this.checkAchievementToGet()
      },
      error => {}, 
      () => {}) 
  }
  checkAchievementToGet(){
    if (this.userProgressUpdate?.userProgress?.totalCompletedCategory == 1) {
      let achievementCompleteFirstQuiz = this.userProgressUpdate?.userProgress?.achievements.find(x => x.name === 'Pierwsza kategoria')
      // console.log(achievementCompleteFirstQuiz)
      if (achievementCompleteFirstQuiz == undefined) {
        console.log(achievementCompleteFirstQuiz + 'tutaj powinno dodać achievement')
        
        this.subAchievementList = this.achievementRest.getAchievementList().subscribe({
          next: (response) => {
            if (response.body) {
              this.achievementList = response.body
              console.log(this.achievementList)
              this.postAchievementFirstCategoryToUser()
            }
            else{
              this.customErrorAchievementList = 'Brak obiektu odpowiedzi'
            } 
          },
          error: (errorResponse) => {
                this.customErrorAchievementList = errorResponse.error;
          },
          complete: () => {}
        })


      }
      if (achievementCompleteFirstQuiz) {
        console.log(achievementCompleteFirstQuiz + 'nie dodaje achivementów')
      }
    }
  }

  postAchievementFirstCategoryToUser(){
    let currentUser = this.userDataService.getId()
    console.log(currentUser)

    let sortAchievementToSearchFirstCategoryUnlock = this.achievementList!.find(x => x.name === 'Pierwsza kategoria')
    console.log(sortAchievementToSearchFirstCategoryUnlock?.id)

    this.subAchievementAddFirstCategoryUnlockToUser
  }

  hideReightPanel(value: boolean){
    if (value) {
      this.input.toggle()
      // const main = document.getElementById('main')
      // main?.classList.add('main_panel_hide')
      setTimeout(() => this.smallRightPanel = true,30)
      // this.smallRightPanel = true
    }
  }

  showRightPanel(){
    // this.smallRightPanel = false
    this.input.toggle()
    // setTimeout(() => this.input.toggle(),10)
    const main = document.getElementById('main')
      main?.classList.remove('main_panel_hide')
      setTimeout(() => this.smallRightPanel = false,30)
      // this.smallRightPanel = false
  }
  tablet?: boolean

  setSizeOptions(width: number){
    if (window.innerWidth < 1400) {
      this.menuMode = 'over'
      this.tablet = true
      this.smallRightPanel = true
     }
     if (window.innerWidth < 800) {
      this.mobileView = true
      this.smallRightPanel = false
      this.menushow = false
     }
     if (window.innerWidth >= 800 && window.innerWidth <1400) {
      this.mobileView = false
      this.menushow = false
     }
     
     if (window.innerWidth >= 1400) {
      this.mobileView = false
      this.menuMode = 'side'
      if (this.menushow && this.tablet) {
        this.smallRightPanel = false
      }
      if (this.tablet && !this.menushow) {
        this.smallRightPanel = true
      }
      if (this.menushow == false) {
        this.menushow = true
        this.smallRightPanel = false
      }
      if (this.tablet && !this.menushow ) {
        this.smallRightPanel = true
      }
      this.tablet = false
     
     }


   }

  mobileMenu(){
    this.mobileDrawer.toggle()
  }



  logout(){
    localStorage.removeItem('currentUser')
    this.router.navigate(['./login'])
  }
}
