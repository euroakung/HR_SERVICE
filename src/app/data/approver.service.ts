import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams
} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../shared/authentication.service';
  

export interface IApproveResponse {  
    approvE_ID: string;
    approvE_NAME1: string;
    facultY_ID: string;
    approvE_USE_ID: string;
    approvE_NAME2: string;
}

@Injectable({ providedIn: 'root' })
//export class ApiService {
  export class ApiAproverService {  
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }



  getApprove(execId:string,facultyId :string,approve:boolean) {
    const url = environment.apiUrl + '/api/approver';
    return this.http.post<any[]>(url,{"ExecId": execId,"FacultyId":facultyId,"ApproveStatus":approve});
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
