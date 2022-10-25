import { Injectable } from '@angular/core';
import { User } from '../user-rest.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  
  private user?: User;

  constructor() { }

  setUser(user: User){
    this.user = user;
  }


  getName():string|undefined{
    return this.user?.name;
  }
  getId(): number{
    return this.user!.id
  }
  isAdmin():boolean|undefined{
    return this.user?.type == 'Admin';
  }
}
