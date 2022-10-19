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
      // setTimeout(() => this.smallRightPanel = true,800)
      this.smallRightPanel = true
    }
  }

  showRightPanel(){
    // this.smallRightPanel = false
    this.input.toggle()
    const main = document.getElementById('main')
      main?.classList.remove('main_panel_hide')
      this.smallRightPanel = false
  }

  setSizeOptions(width: number){
    if(window.innerWidth < 600){
      // this.menuMode = 'side';
      this.smallRightPanel = false
     }
    //  else{
    //   // this.menuMode = 'over';
    //   this.smallRightPanel = false
    //  }
     if (window.innerWidth < 800) {
      this.mobileView = true
      this.smallRightPanel = false
     }
     else if (window.innerWidth >= 800) {
      this.mobileView = false
     }
     if (window.innerWidth < 1200) {
      this.menuMode = 'over'

     }
     else if (window.innerWidth >= 1200) {
      this.menuMode = 'side'
     }


   }// TRZEBA POPRAWIĆ (SCHOWAJ PRAWY PANEL ZMIEN NA MOBILE I ROZSZERZ (NIE DZIALA WTEDY PRAWY PANEL))

   mobileMenu(){
    this.mobileDrawer.toggle()
   }
}
