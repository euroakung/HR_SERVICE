import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams
} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../shared/authentication.service';
  

export interface ICountryResponse {
  
  Countryid: string;
  CountryNameTh: string;
  CountryNameEn: string;
  CountryFormalNameTh: string;
  CountryFormalNameEn: string;
}

@Injectable({ providedIn: 'root' })
//export class ApiService {
  export class ApiCountryService {  
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }



  getCountry() {
    const url = environment.apiUrl + '/api/country';
    return this.http.get<ICountryResponse[]>(url);
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
