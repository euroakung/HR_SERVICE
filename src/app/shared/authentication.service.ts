import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { User } from '../models';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

   
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public  userData = new BehaviorSubject<User>(new User());    
    headers = new HttpHeaders().set('Content-Type', 'application/json');
 

    constructor(private http: HttpClient) {
         this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
         this.currentUser = this.currentUserSubject.asObservable();
    }
  //  currentUserValue
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
         
        return this.http.post<any>(`${environment.apiUrl}/api/users/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
             //   console.log(user);
              
                 localStorage.setItem('personId', user.id) ;
                 localStorage.setItem('token', user.token) ;
                 localStorage.setItem('currentUser', JSON.stringify(user)); 
                  //this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        
        localStorage.removeItem('personId') ;
        localStorage.removeItem('currentUser');
        this.currentUserSubject  =null;
        this.currentUser  =null;
        let removeToken = localStorage.removeItem('token');
        
    }

    getToken() {
        return localStorage.getItem('token');
      }
    
      get isLoggedIn(): boolean {
        let authToken = localStorage.getItem('token');
        return (authToken !== null) ? true : false;
      }

  

   
} 