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
      let urlId = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    let token = this.helper.decodeToken(localStorage.getItem('currentUser')!);
    // console.log(token)
    let elo = urlId.valueOf()
    // console.log(urlId.valueOf())
    // console.log(token)
    const myJSON = JSON.stringify(token);
    // console.log(myJSON.slice(-40))
    // console.log(myJSON)
    // const obj = Object.fromEntries(token);
    // console.log(obj)

    const object2 = Object.fromEntries(
      Object.entries(token)
      .map(([ key, val ]) => [ key, val ])
    );
    // console.log(object2)


    for (let [key, value] of Object.entries(token)) {
      // console.log(`${key}: ${value}`)
      this.obj0.push(`${key}: ${value}`)
    }
    let indexOfToken = this.obj0[0]
    // console.log(indexOfToken)

    // console.log(indexOfToken.replace('http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier: ', ''))
    let userIdFromToken = indexOfToken.replace('http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier: ', '')
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
