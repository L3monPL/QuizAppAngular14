import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDataService } from '../services/global-services/user-data.service';
import { UserRestService } from '../services/user-rest.service';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private userGlobalService: UserDataService,
    private router: Router,
    private userRest: UserRestService,
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

  private check(onlyAdmin: boolean):Promise<boolean>{
    return new Promise<boolean>((resolve, rejects) => {
      this.userRest.getUser()
      .subscribe({
        next: (response) => {
          if(response.body){
            if(onlyAdmin){
              if(response.body.type == 'Admin'){
                this.userGlobalService.setUser(response.body);
                resolve(true)
              }
              else{
                this.router.navigateByUrl('/login');
                resolve(false)
              }
            }
            else{
              this.userGlobalService.setUser(response.body);
              resolve(true)
            }
          }
          else{
            this.router.navigateByUrl('/login');
            resolve(false)
          }
        },
        error: (errorResponse) => {
          // console.log(errorResponse);
          this.router.navigateByUrl('/login');
          resolve(false)

        },
        complete: () => {

        }
      }
    )
  }
  )}
}
