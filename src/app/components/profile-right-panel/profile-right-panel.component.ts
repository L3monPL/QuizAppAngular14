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

    if (this.currentLvl > 1) {
      this.abc = 120

      this.value120 = 120
  
  
      // if (this.currentLvl == 1) {
      //   this.value120 = this.value120 * 2
      // }
  
  
      for (let index = 1; index < this.currentLvl; index++) {
        this.value120 = this.value120 * 2
        console.log(this.value120)
      }
  
      this.abc = this.value120 / 2
  
      let value = this.currentExpPoints - this.abc
      console.log(value)
  
      this.currentExpPoints = (value / this.value120) * 100
      console.log(this.currentExpPoints)
    }
    if (this.currentLvl == 1) {
      this.currentExpPoints = (this.currentExpPoints % 120)
    this.currentExpPoints = (this.currentExpPoints / 120) * 100
    }

   

  }

  hideRightPanel(){
    this.hideReightPanel.emit(true)
    console.log('hide')
  }

}
