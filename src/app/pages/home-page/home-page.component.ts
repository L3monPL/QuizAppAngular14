import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CategoryRestService } from 'src/app/services/category-rest.service';


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

  obj0 = Array<any>()

  @ViewChild('drawer') input!: MatDrawer
  @ViewChild('mobileDrawer') mobileDrawer!: MatDrawer

  @HostListener('window:resize', ['$event'])
     onResize(event: any){
      this.setSizeOptions(window.innerWidth)
   }


  constructor(
    private router: Router,
    ) { }

  ngOnInit(): void {

    if(this.router.url === '/home')
    {
      this.router.navigate(['./home/dashboard'])
    }

    this.getUserIdFromToken()

    this.setSizeOptions(window.innerWidth)
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

  getUserIdFromToken(){
    let urlId = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    let token = this.helper.decodeToken(localStorage.getItem('currentUser')!);
    // console.log(token)
    let elo = urlId.valueOf()
    // console.log(urlId.valueOf())
    // console.log(token)
    const myJSON = JSON.stringify(token);
    // console.log(myJSON.slice(-40))
    // console.log(myJSON)
    // const obj = Object.fromEntries(token);
    // console.log(obj)

    const object2 = Object.fromEntries(
      Object.entries(token)
      .map(([ key, val ]) => [ key, val ])
    );
    // console.log(object2)


    for (let [key, value] of Object.entries(token)) {
      // console.log(`${key}: ${value}`)
      this.obj0.push(`${key}: ${value}`)
    }
    let indexOfToken = this.obj0[0]
    // console.log(indexOfToken)
    console.log(indexOfToken.replace('http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier: ', ''))
  }
}
