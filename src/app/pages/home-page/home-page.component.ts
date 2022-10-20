import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav';
import { Router } from '@angular/router';
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
      console.log('<1200')
     }
     if (window.innerWidth < 800) {
      this.mobileView = true
      this.smallRightPanel = false
      this.menushow = false
      console.log('<800')
     }
     else if (window.innerWidth >= 800 && window.innerWidth <1200) {
      this.mobileView = false
      this.menushow = true
      // this.smallRightPanel = false
      console.log('>=800<1200')
     }
     
     if (window.innerWidth >= 1200) {
      this.menuMode = 'side'
      if (this.menushow && this.tablet) {
        this.smallRightPanel = false
        console.log('>=1200  1')
      }
      // if (this.smallRightPanel == false && this.menushow == false) {
      //   this.smallRightPanel = true
      // }
      if (this.tablet == true && !this.menushow) {
        // this.menushow = true
        this.smallRightPanel = true
        console.log('2')
      }
      if (this.menushow == false) {
        this.menushow = true
        this.smallRightPanel = false
        console.log('3')
      }
      if (this.tablet == true && !this.menushow ) {
        // this.menushow = true
        this.smallRightPanel = true
        console.log('4')
      }
      this.tablet = false
      
      // if (this.menushow == true) {
      //   this.smallRightPanel = false

      // }

      
     }


   }// TRZEBA POPRAWIĆ (SCHOWAJ PRAWY PANEL ZMIEN NA MOBILE I ROZSZERZ (NIE DZIALA WTEDY PRAWY PANEL))

   mobileMenu(){
    this.mobileDrawer.toggle()
   }
}
