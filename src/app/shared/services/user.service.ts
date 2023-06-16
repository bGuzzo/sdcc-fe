import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRegistrationRequest } from '../entities/request/user-registration-request';
import { Constants } from '../constants';
import { HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../entities/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public registerNewUser(user: UserRegistrationRequest) {
    this.http.post<any>(Constants.API_USER_NEW, { body: user }).subscribe();
  }

  public getUserInfo(token: string): Observable<User> {
    // const authHeaders = {
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${token}`
    // };
    return this.http.get<User>(Constants.API_USER_INFO);
  }

  // private handleError(error: HttpErrorResponse) {
  //   if (error.status === 0) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     window.alert('Network error')
  //     // console.error('An error occurred:', error.error);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong.
  //     window.alert(`Backend returned code ${error.status}, body was: ` + error.error);
  //   }
  //   // Return an observable with a user-facing error message.
  //   return throwError(() => new Error('Something bad happened; please try again later.'));
  // }
}
