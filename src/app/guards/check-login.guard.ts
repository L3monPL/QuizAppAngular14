import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { UserDataService } from '../services/global-services/user-data.service';
import { UserRestService } from '../services/user-rest.service';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate, CanActivateChild, CanLoad {

  helper = new JwtHelperService();

  obj0 = Array<any>()

  constructor(
    private userGlobalService: UserDataService,
    private router: Router,
    private userRest: UserRestService,
    private userDataService: UserDataService
  ){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let onlyAdmin = route.data['onlyAdmin'] as boolean
    return this.check(onlyAdmin);
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.check(false);
  }

  check(onlyAdmin: boolean):Promise<boolean>{
    return new Promise<boolean>((resolve, rejects) => {
    let token = this.helper.decodeToken(localStorage.getItem('currentUser')!);
   
    

    let userIdFromToken = token.jti
    if (!this.userDataService.userIdByToken) {
      this.userDataService.userIdByToken = userIdFromToken
    }
    
      this.userRest.getUserById(this.userDataService.userIdByToken!)
      .subscribe({
        next: (response) => {
          if(response.body){
            if(onlyAdmin){
              if(response.body.role.name == 'Admin'){
                this.userGlobalService.setUser(response.body);
                // console.log(response.body)
                resolve(true)
              }
              else{
                this.router.navigateByUrl('/login');
                resolve(false)
              }
            }
            else{
              this.userGlobalService.setUser(response.body);
              // console.log(response.body)
              resolve(true)
            }
          }
          else{
            this.router.navigateByUrl('/login');
            resolve(false)
          }
        },
        error: (errorResponse) => {
          console.log(errorResponse);
          this.router.navigateByUrl('/login');
          resolve(false)

        },
        complete: () => {
          // console.log(this.userGlobalService.getName())
        }
      }
    )
  }
  )
}

}
