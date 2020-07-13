import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IServiceResponse } from 'src/app/data/service-response';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ILeave {
  ApproveId: number;
  ApproveName: string;
  RequestId: string;
  BudgetYy: string;
  PersonId: string;
  PersonName: string;
  PersonPertype: string;
  Workline: string;
  WorklineName: string;
  Position: string;
  PositionName: string;
  PositionExec: string;
  PositionExecName: string;
  PositionAcad: string;
  PositionAcadName: string;
  Division: string;

  DivisionName: string;
  Faculty: string;

  FacultyName: string;
  LeaveAbroad: boolean;
  LeaveType: string;
  LeaveTypeName: string;  
  Country: string;
  RequestDate: string;
  ScheduleDate: string;
  Writing: string;
  Subject: string;
  Inform: string;
  Cause: string;
  StartDate: string;
  StartDateFull: boolean;
  EndDate: string;
  EndDateFull: boolean;
  LeaveDay: string;
  LeaveDaySick: string;
  LeaveDayPersonal: string;
  LeaveDayMaternity: string;
  LeaveDayVacation: string;
  LeaveDayVacationNet: string;
  LeaveContact: string;
  ApproveReson: string;
  ApproveStatus: string;
  ApproveDate: string;
  OrdinationStatus: string;
  TempleName: string;
  TempleName1: string;
  TempleAddress: string;
  TempleAddress1: string;
  CommentSupervisors: string; 
   RequestRunning : string;
   RequestBarcodenum : string;
   RequestBarcodeimg : string;
   RequestWifeName : string;
   RecordStatus : string;
   CreateDate : string;
   CreateUser : string;
   CreateUserType : string;
   LastDate : string;
   LastUser : string;
   LastUserType : string;
   OptionHoliday : string;
   LeaveCancel : string;
   CancelStartDate : string;
   CancelDateFull : string;
   CancelDate : string;
   CancelEndDateFull : string;
   CancelLeaveDay : string;
   LeaveDayTotal : string;
   token : string;

}

export interface ILeaveType {
  leaveTypeId: number;
  leaveTypeNameTh: string;
  leaveTypeAcronymTh: string; 
}
@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private http: HttpClient) { }


 

  public getLeaveItems(){
    const url = `${environment.apiUrl}/api/Leave/GetDataLeave`;
    return this.http.get(url);
  }

  public getLeaveItemsById(id: string ){
    const url = `${environment.apiUrl}/api/Leave/${id}`;
  //  const opts = { params: new HttpParams({fromString: "_page=1&_limit=10"}) };
  //const opts = { params: new HttpParams({fromString: "_id="+id}) };
    return this.http.get(url);
  }


  public getLeaveTypeItems(id :string){
    const url = `${environment.apiUrl}/api/LeaveType/${id}`; 
    return  this.http.get(url) ;
  }

  public createLeave(formVal:ILeave){
 
       
       const url = `${environment.apiUrl}/api/Leave/createLeave`;  
      // alert
     
      // return  this.http.post<any>(url,data);
      const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
       
      var data = JSON.stringify(formVal);
      return this.http.post<ILeave>(url,data,httpOptions)
      .pipe(map(user => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
      console.log(user);
       
       alert("ddddd"+ user.PersonId);
          //  localStorage.setItem('token', user.token) 
          //  localStorage.setItem('currentUser', JSON.stringify(user)); 
            //this.currentUserSubject.next(user);
          return user;
      }));
  }

      
}
