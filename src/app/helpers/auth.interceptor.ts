import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthenticationService } from '../shared/authentication.service';
import { tap } from 'rxjs/operators'; 

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService,private router :Router){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
        // add auth header with jwt if user is logged in and request is to the api url
       // console.log( this.authenticationService.currentUserValue);
        
        const currentUser = this.authenticationService.currentUserValue;
        const isLoggedIn = currentUser && currentUser.token;
        const isApiUrl = request.url.startsWith(environment.apiUrl);

        if (localStorage.getItem('token') != null) {
           const  cloneReq = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                return next.handle(cloneReq).pipe(
                    tap(
                        succ=>{
alert ("token11= "+  localStorage.getItem('token'));
                        },err=>{
                            if( err.status == 401){ 
                                     this.router.navigate(['user/login']);
                            }
                        }
                    )
                )

        }
        // if (isLoggedIn && isApiUrl) {
        //     // request = request.clone({
        //     //     setHeaders: {
        //     //         Authorization: `Bearer ${currentUser.token}`
        //     //     }
        //     // });
        //   const cloneReq =   request.clone({

        //         headers:request.headers.set('Authorization' , `Bearer ${currentUser.token}`)
        //     });
        //  //   console.log(request);
            
        //     return next.handle(cloneReq).pipe(
        //         tap(
        //             succ =>{   console.log(request);},
        //             err =>{
        //                     if(err.status==401){

        //                     localStorage.removeItem("");
        //                         this.router.navigateByUrl('login');
        //                     }
        //                 } 
        //             )
        //     );
        //     console.log(request);
        // }else{

        //     return next.handle(request.clone());


        // }

   
    }
}