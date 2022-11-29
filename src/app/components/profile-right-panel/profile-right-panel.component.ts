import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserManagerRestService } from 'src/app/services/components-services/user-manager-rest.service';
import { UserDataService } from 'src/app/services/global-services/user-data.service';
import { UserList, UserRanking } from 'src/app/services/user-rest.service';


@Component({
  selector: 'app-profile-right-panel',
  templateUrl: './profile-right-panel.component.html',
  styleUrls: ['./profile-right-panel.component.scss']
})
export class ProfileRightPanelComponent implements OnInit, OnDestroy {

  @Output() hideReightPanel = new EventEmitter<boolean>()

  currentExpPoints?: number

  currentLvl?: number

  abc?: number 

  value120?: number

  userProgressUpdate?: UserList

  subsProgressBar?: Subscription
  subRanking?: Subscription

  userListRanking?: Array<UserRanking>


  constructor(
    public userData: UserDataService,
    public userManagerService: UserManagerRestService,
  ) { }

  ngOnDestroy(): void {
    this.subsProgressBar?.unsubscribe()
    this.subRanking?.unsubscribe()
  }

  ngOnInit(): void {
    this.userManagerService.checkUserProgress()
    this.userManagerService.checkRankingUsers()

    this.subscribeUserRest()
    this.subscribeUsersRanking()

  }

  hideRightPanel(){
    this.hideReightPanel.emit(true)
    console.log('hide')
  }


  subscribeUserRest(){
    this.subsProgressBar = this.userManagerService.serviceCurrentUser.subscribe(
      res => {
        this.userProgressUpdate = res
        this.default()
      },
      error => {}, 
      () => {}) 
  }

  subscribeUsersRanking(){
    this.subRanking = this.userManagerService.serviceUserRangingList.subscribe(
      res => {
        this.userListRanking = res
        console.log(this.userListRanking)
      },
      error => {}, 
      () => {})
  }


  default(){
      this.currentLvl = this.userProgressUpdate?.userProgress?.level!
      this.currentExpPoints = this.userProgressUpdate?.userProgress?.experiencePoints!
      console.log(this.currentLvl)
      if (this.currentLvl > 1) {
        this.abc = 120
  
        this.value120 = 120
    
    
    
    
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
  


}
