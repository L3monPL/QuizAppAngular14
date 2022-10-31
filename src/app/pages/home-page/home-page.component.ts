import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CheckLoginGuard } from 'src/app/guards/check-login.guard';
import { CategoryRestService } from 'src/app/services/category-rest.service';
import { UserDataService } from 'src/app/services/global-services/user-data.service';


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

  @ViewChild('drawer') input!: MatDrawer
  @ViewChild('mobileDrawer') mobileDrawer!: MatDrawer

  @HostListener('window:resize', ['$event'])
     onResize(event: any){
      this.setSizeOptions(window.innerWidth)
   }


  constructor(
    private router: Router,
    public userDataService: UserDataService,
    ) { }

  ngOnInit(): void {

    if(this.router.url === '/home')
    {
      this.router.navigate(['./home/dashboard'])
    }

    // this.smallRightPanel = false
    if(window.innerWidth < 1200){
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
    if (window.innerWidth < 1200) {
      this.menuMode = 'over'
      this.tablet = true
      this.smallRightPanel = true
     }
     if (window.innerWidth < 800) {
      this.mobileView = true
      this.smallRightPanel = false
      this.menushow = false
     }
     if (window.innerWidth >= 800 && window.innerWidth <1200) {
      this.mobileView = false
      this.menushow = false
     }
     
     if (window.innerWidth >= 1200) {
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
