import { EventEmitter, Injectable } from '@angular/core';
import { User, UserList } from '../user-rest.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  userDataEmitter: EventEmitter<any> = new EventEmitter();

  public user?: UserList;

  userIdByToken?: number

  constructor() { }

  setUser(user: UserList){
    this.user = user;
  }


  getName():string|undefined{
    return this.user?.username;
  }
  getId(): number{
    return this.user!.id
  }
  isAdmin():boolean|undefined{
    return this.user?.role.name == 'Admin';
  }
  getProfileIcon(): string|undefined{
    return 'https://wsblearnstorage.blob.core.windows.net/avatarcontainer/User_Icon_0-ce698e0b-12fd-461a-88ca-0bd24f9484cf.png'
    // return this.user?.profilePictureUrl
  }

  getEmail(): string{
    return this.user!.emailAddress
  }

  getLevel(): number{
    return this.user!.userProgress.level
  }

  getExperiencePoints():number{
    return this.user!.userProgress.experiencePoints
  }

  getTotalCompletedQuiz():number{
    return this.user!.userProgress.totalCompletedQuiz
  }

  // getCurrentCategoryProgress(){
  //   return this.user?.userProgress.categoryProgress
  // }

}
