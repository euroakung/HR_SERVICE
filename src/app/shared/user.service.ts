import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../models';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/api​/Users`);
    }
    getUserData() {    
        return this.http.get('/api/user/GetUserData').pipe(map(result => result));    
      }    
        
      getAdminData() {    
        return this.http.get('/api/user/GetAdminData').pipe(map(result => result));    
      }    
}