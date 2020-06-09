import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IServiceResponse } from 'src/app/data/service-response';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ILeave {
  id: number;
  title: string;
  detail: string;
  category: string;
  status: string;
  label: string;
  labelColor: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private http: HttpClient) { }  
  getLeaveItems(): Observable<ILeave[]> {
    const url = `${environment.apiUrl}/api/Authent`;

   // headers:request.headers.set('Authorization' , `Bearer ${currentUser.token}`)
    var tokenHeader = new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')});
    return this.http.get(url,{headers:tokenHeader})
      .pipe(
        map((res: IServiceResponse<ILeave>) => {
          // console.log("response[todo.service][getTodoItems]", res);
          return res.data;
        })
      );
  }

}
