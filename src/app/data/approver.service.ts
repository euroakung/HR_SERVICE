import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams
} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../shared/authentication.service';
import { IServiceResponse } from './service-response';
  

export interface IApproveResponse {  
  personId: string;
  nameTh: string;
  execId: string;
  execName: string;
  execDetail: string;
  facultyId: string;
  facultyNameTh: string;
  execIndex: string;
  spclPersonNameTh: string;
  approveStatus: string;

}

@Injectable({ providedIn: 'root' })
//export class ApiService {
  export class ApiAproverService {  
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }



  getApprove(execId:string,facultyId :string,approve:boolean) {
    const url = environment.apiUrl + '/api/approver';
    return this.http.post<IApproveResponse[]>(url,{"ExecId": execId,"FacultyId":facultyId,"ApproveStatus":approve});
  }
 
  // getApprove(execId:string,facultyId :string,approve:boolean) : Observable<IApproveResponse[]> {
  //   const url = environment.apiUrl + '/api/approver';
  //   return  this.http.post(url,{"ExecId": execId,"FacultyId":facultyId,"ApproveStatus":approve}).pipe(
  //       map((res: IServiceResponse<IApproveResponse>) => { 
  //       // console.log("response[survey.service][getSurveyItems]", res);
  //        return res.data;
  //       })
  //     );
  // } 
}
