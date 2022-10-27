import { HttpInterceptor } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(){

    }
    intercept(req:any, next:any){
        var token = localStorage.getItem('currentUser')

        var authRequest = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        })
        return next.handle(authRequest)
    }
}