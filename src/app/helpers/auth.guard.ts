import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
 
import { AuthenticationService } from '../shared/authentication.service';

import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { tap } from 'rxjs/operators';
 
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //    const currentUser = this.authenticationService.currentUserValue; 
    //    console.log(currentUser);
    //    localStorage.getItem('token');
    //    alert(currentUser);
    //     if (currentUser.token !=null) {
    //         return true;
    //    }else{
    //       // / alert("false canActivate");

    //   //  not logged in so redirect to login page with the return url
    //   this.router.navigate(['user/login']);
    //    return false;

    //    }
     const  token = localStorage.getItem('token');
    if (token != null)  {
        return true;
      }else{
        this.router.navigate(['user/login']);
        return false;

      }
  
    //   return this.authenticationService.verifyToken().pipe(
    //     tap(allowed => {
    //         this.router.navigate(['user/login']);
    //     })
    //   );

 
    }
}