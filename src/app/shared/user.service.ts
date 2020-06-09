import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import { environment } from '@environments/environment';
// import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
  
    constructor(private http: HttpClient) { }
//    readonly BaseURI = "https://localhost:44346/api/Authent";
    //     readonly BaseURI  =  `${environment.apiUrl}/api/Authent`
    // getAll() {
    //     return this.http.get<User[]>(this.BaseURI);
    // }
}