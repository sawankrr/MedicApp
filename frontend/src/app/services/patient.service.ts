import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  baseURL = 'http://localhost:4000/api/appointment';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  getAppointment(userId): Observable<any> {
    return this.http.get(`${this.baseURL}/get-appointment/${userId}`);
  }

  getAllAppointment(doctorId): Observable<any> {
    return this.http.get(`${this.baseURL}/get-appointment-for-doctor/${doctorId}`);
  }
  getAllAppointmentByDate(doctorId, currentDate): Observable<any> {
    console.log(doctorId + 'getAllAppointmentByDate service' + currentDate)
    return this.http.get(`${this.baseURL}/get-appointment-for-doctor/${doctorId}/${currentDate}`);
  }


  updateAppointmentStatus(aptId, currentStatus): Observable<any> {
    const url = `${this.baseURL}/update-appointment-status/${aptId}/${currentStatus}`;
    console.log(url);
    return this.http.put(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    );
  }

  // updateAppointmentStatus(aptId, currentStatus): Observable<any> {
  //   return this.http.put(`${this.baseURL}/get-appointment-for-doctor/${doctorId}/${currentDate}`);
  // }

  getAppointmentForDoctor(doctorId): Observable<any> {
    return this.http.get(`${this.baseURL}/get-appointment-by-doctor/${doctorId}`);
  }

  bookAppointment(userId: string,
                  doctorId: string,
                  dateOfAppointment: string,
                  timeOfAppointment: string,
                  currentStatus: string,
                  remarks: string
                  ): Observable<any> {
                  return this.http.post<any>(`${this.baseURL}/add-appointment`,{userId, doctorId, dateOfAppointment, timeOfAppointment,
                    currentStatus,remarks})
                  .pipe(map(user => {
                  return user;
                  }));
                  }


  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
