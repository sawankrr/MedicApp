import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  baseURL = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {}

  getSpecialisation(): Observable<any> {
    return this.http.get(`${this.baseURL}/get-speciality`);
  }


  getDoctors(): Observable<any> {
    return this.http.get(`${this.baseURL}/find-doctors`);
  }

  getUser(userId): Observable<any> {
    return this.http.get(`${this.baseURL}/${userId}`);
  }





}
