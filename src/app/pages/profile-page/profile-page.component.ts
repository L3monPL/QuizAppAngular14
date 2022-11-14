import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/services/global-services/user-data.service';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  constructor(
    public userData: UserDataService,
    private router: Router,
  ) 
  {
  }

  ngOnInit(): void {
    if(this.router.url === '/home/profile')
    {
      this.router.navigate(['./home/profile/main'])
    }
  }

}
