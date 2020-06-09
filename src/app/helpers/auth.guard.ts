import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
 
import { AuthenticationService } from '../shared/authentication.service';

import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
const redirectUnauthorizedToLogin = () =>  redirectUnauthorizedTo(['/user']) ;
const redirectLoggedInToItems = () => redirectLoggedInTo(['/app']);
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
       const currentUser = this.authenticationService.currentUserValue;
      
        if (currentUser) {
            return true;
       }else{
          // / alert("false canActivate");

      //  not logged in so redirect to login page with the return url
      this.router.navigate(['user/login']);
       return false;

       }

 
    }
}