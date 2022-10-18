import { Component, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
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

  constructor(
    private router: Router,
    ) { }

  ngOnInit(): void {

    if(this.router.url === '/home')
    {
      this.router.navigate(['./home/dashboard'])
    }
  }

}
