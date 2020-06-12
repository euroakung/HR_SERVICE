import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IServiceResponse } from 'src/app/data/service-response';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ILeave {
  RequestId: number;
  PersonName: string;
  LeaveTypeName: string;
  RequestBarcodenum: string;
  RequestDate: string;
  StartDate: string;
  EndDate: string;
  LeaveDay: string;
}

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private http: HttpClient) { }


  // getLeaveItems(): Observable<ILeave[]> {
  //   const url = `${environment.apiUrl}/api/Leave/GetDataLeave`;
  //   return this.http.get(url).
  //       map((res: IServiceResponse<ILeave>) => { 
           
  //         return res;
  //       });
      
  // }

  public getLeaveItems(){
    const url = `${environment.apiUrl}/api/Leave/GetDataLeave`;
    return this.http.get(url);
  }

  public getLeaveItemsById(id: string ){
    const url = `${environment.apiUrl}/api/Leave/${id}`;
  //  const opts = { params: new HttpParams({fromString: "_page=1&_limit=10"}) };
  const opts = { params: new HttpParams({fromString: "_id="+id}) };
    return this.http.get(url);
  }


  

 

}
