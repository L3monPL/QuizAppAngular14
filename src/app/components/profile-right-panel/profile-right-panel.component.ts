import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserDataService } from 'src/app/services/global-services/user-data.service';


@Component({
  selector: 'app-profile-right-panel',
  templateUrl: './profile-right-panel.component.html',
  styleUrls: ['./profile-right-panel.component.scss']
})
export class ProfileRightPanelComponent implements OnInit {

  @Output() hideReightPanel = new EventEmitter<boolean>()

  currentExpPoints?: number

  currentLvl?: number

  abc?: number 

  value120?: number


  constructor(
    public userData: UserDataService
  ) { }

  ngOnInit(): void {
    this.currentLvl = this.userData.getLevel()
    this.currentExpPoints = this.userData.getExperiencePoints()
    // this.currentExpPoints = (this.currentExpPoints % 120)
    // this.currentExpPoints = (this.currentExpPoints / 120) * 100
    // console.log(this.currentExpPoints)

    this.abc = 120

    this.value120 = 120

    for (let index = 0; index < this.currentLvl - 2; index++) {
      this.abc = this.abc * 2
      console.log(this.abc + 'mniejsze')
    }


    for (let index = 0; index < this.currentLvl - 1; index++) {
      this.value120 = this.value120 * 2
      console.log(this.value120)
    }

    this.currentExpPoints = (this.currentExpPoints / this.value120) * 100
    console.log(this.currentExpPoints)
    // this.currentExpPoints = (this.currentExpPoints / 120) * 100
    // console.log(this.currentExpPoints)
  }

  hideRightPanel(){
    this.hideReightPanel.emit(true)
    console.log('hide')
  }

}
