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
  menushow?: boolean = true
  smallRightPanel = false

  @ViewChild('drawer') input!: MatDrawer; 

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
    this.smallRightPanel = false
  }

  hideReightPanel(value: boolean){
    if (value) {
      this.input.toggle()
      const main = document.getElementById('main')
      // main?.classList.add('main_panel_hide')
      setTimeout(() => this.smallRightPanel = true,800)
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
     else{
      // this.menuMode = 'over';
      this.smallRightPanel = false
     }

   }// TRZEBA POPRAWIĆ (SCHOWAJ PRAWY PANEL ZMIEN NA MOBILE I ROZSZERZ (NIE DZIALA WTEDY PRAWY PANEL))

}
