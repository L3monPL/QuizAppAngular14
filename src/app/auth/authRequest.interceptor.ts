import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, of, throwError } from "rxjs";
import { UserDataService } from "../services/global-services/user-data.service";
import { UserRestService } from "../services/user-rest.service";

@Injectable()
export class AuthRequestInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private userDataService: UserDataService,
        private userRest: UserRestService
        ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              this.router.navigate(['/login']);
            }
            if (error.status === 403) {
                this.router.navigate(['/login']);
              }
            throw error;
          })
        );
    }
    


}