import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams
} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../shared/authentication.service';
  

export interface IInformResponse {
  
    approvE_ID: string;
    approvE_NAME1: string;
    facultY_ID: string;
    approvE_USE_ID: string;
    approvE_NAME2: string;
}

@Injectable({ providedIn: 'root' })
//export class ApiService {
  export class ApiInfromService {  
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }



  getInform() {
    const url = environment.apiUrl + '/api/inform';
    return this.http.post<any[]>(url,{ "FACULTY_ID":this.authenticationService.currentUserValue.facultyId });
  }



  // getApprove1() {
  //   const url = environment.apiUrl + '/api/Approver';
  //   let params = new HttpParams();
   
 
  //   return this.http.post(url, { "FACULTY_ID":this.authenticationService.currentUserValue.facultyId })
  //     .pipe(
  //       map((res: IApproveResponse) => {
  //         return res;
  //       }),
  //       catchError(errorRes => {
  //         return throwError(errorRes);
  //       })
  //     );
  // }
}
