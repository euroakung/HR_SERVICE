import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models';
import { environment } from '../../environments/environment';
   

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
  
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    readonly BaseURI  =  `${environment.apiUrl}/api/Authent`

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    signIn(username:string,password:string) {


     //  return this.http.post(this.BaseURI, { username, password });


        
        return this.http.post<any>(this.BaseURI, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user); 
                return user; 
            }));

           // return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
        //     .pipe(map(user => {
        //         // store user details and jwt token in local storage to keep user logged in between page refreshes
        //         localStorage.setItem('currentUser', JSON.stringify(user));
        //         this.currentUserSubject.next(user);
        //         return {
        //             id: user.id,
        //             username: user.username,
        //             firstName: user.firstName,
        //             lastName: user.lastName,
        //             token: 'fake-jwt-token'
        //         };
               
        //     }));
    }

    signOut() {
        // remove user from local storage to log user out
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.currentUser=null;
        return true;
    }
}