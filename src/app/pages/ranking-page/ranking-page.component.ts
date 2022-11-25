import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserManagerRestService } from 'src/app/services/components-services/user-manager-rest.service';
import { UserList, UserRanking } from 'src/app/services/user-rest.service';

@Component({
  selector: 'app-ranking-page',
  templateUrl: './ranking-page.component.html',
  styleUrls: ['./ranking-page.component.scss']
})
export class RankingPageComponent implements OnInit, OnDestroy {

  ranking = [
    {
      name: 'Mikołaj',
      points: 999
    },
    {
      name: 'Franek',
      points: 879
    },
    {
      name: 'Teodor',
      points: 700
    },
    {
      name: 'Kajetan',
      points: 546
    },
    {
      name: 'Witold',
      points: 232
    },
    {
      name: 'Franek',
      points: 879
    },
    {
      name: 'Teodor',
      points: 700
    },
    {
      name: 'Kajetan',
      points: 546
    },
    {
      name: 'Witold',
      points: 232
    },
    {
      name: 'Franek',
      points: 879
    },
    {
      name: 'Teodor',
      points: 700
    },
    {
      name: 'Kajetan',
      points: 546
    },
    {
      name: 'Witold',
      points: 232
    },
    {
      name: 'Franek',
      points: 879
    },
    {
      name: 'Teodor',
      points: 700
    },
    {
      name: 'Kajetan',
      points: 546
    },
    {
      name: 'Witold',
      points: 232
    },
    {
      name: 'Franek',
      points: 879
    },
    {
      name: 'Teodor',
      points: 700
    },
    {
      name: 'Kajetan',
      points: 546
    },
    {
      name: 'Witold',
      points: 232
    },
    {
      name: 'Franek',
      points: 879
    },
    {
      name: 'Teodor',
      points: 700
    },
    {
      name: 'Kajetan',
      points: 546
    },
    {
      name: 'Witold',
      points: 232
    },
    {
      name: 'Franek',
      points: 879
    },
    {
      name: 'Teodor',
      points: 700
    },
    {
      name: 'Kajetan',
      points: 546
    },
    {
      name: 'Witold',
      points: 232
    },
  ]

  subsProgressBar?: Subscription
  subRanking?: Subscription

  userProgressUpdate?: UserList
  userListRanking?: Array<UserRanking>

  constructor(
    private userManagerService: UserManagerRestService
  ) { }
  ngOnDestroy(): void {
    this.subsProgressBar?.unsubscribe()
    this.subRanking?.unsubscribe()
  }

  ngOnInit(): void {
    this.subscribeUserRest()
    this.subscribeUsersRanking()
    this.userManagerService.checkUserProgress()
    this.userManagerService.checkRankingUsers()
  }

  subscribeUserRest(){
    this.subsProgressBar = this.userManagerService.serviceUser.subscribe(
      res => {
        this.userProgressUpdate = res
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

}
