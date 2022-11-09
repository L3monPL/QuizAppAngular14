import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/global-services/user-data.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  constructor(
    public userData: UserDataService
  ) { }

  ngOnInit(): void {
  }

}
