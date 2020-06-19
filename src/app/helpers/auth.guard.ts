import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router'; 
import { AuthenticationService } from '../shared/authentication.service'; 
import { tap } from 'rxjs/operators';
import { User } from '../models';
import { UserRole } from '../models/roles';
import { Observable } from 'rxjs';
 
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
      private router: Router,
      private authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authenticationService.currentUserValue;
     
      if (user) {
          // logged in so return true
          return true;
      }else{

        // not logged in so redirect to login page with the return url
        this.authenticationService.logout(); 
        this.router.navigate(['user/login'] );
        return false;

      }

      
  }
}