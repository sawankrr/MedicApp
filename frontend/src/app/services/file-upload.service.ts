import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class FileUploadService {

  baseURL = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Get Users
  getUsers() {
    return this.http.get(this.baseURL)
  }

  // Create User
  addUser(name: string, profileImage: File, email: string, phone: string,
          city: string, password: string, problem: string,
          usertype: number): Observable<any> {
    const formData: any = new FormData();
    formData.append('name', name);
    formData.append('avatar', profileImage);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('city', city);
    formData.append('password', password);
    formData.append('problem', problem);
    formData.append('usertype', usertype);

    return this.http.post<User>(`${this.baseURL}/create-user`, formData, {
      reportProgress: true,
      observe: 'events'
    });
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
