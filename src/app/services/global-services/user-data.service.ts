import { EventEmitter, Injectable } from '@angular/core';
import { User, UserList } from '../user-rest.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  userDataEmitter: EventEmitter<any> = new EventEmitter();

  private user?: UserList;

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
    // return this.user?.iconUrl
    let url = 'https://wsblearnstorage.blob.core.windows.net/imagecontainer/User_Icon_0'
    return url
  }

  getEmail(): string{
    return this.user!.emailAddress
  }

}
