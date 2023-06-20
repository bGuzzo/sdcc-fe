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

  public registerNewUser(user: UserRegistrationRequest): Observable<any> {
    return this.http.post<any>(Constants.API_USER_NEW, user);
  }

  public registerNewAdmin(user: UserRegistrationRequest): Observable<any> {
    return this.http.post<any>(Constants.API_ADMIN_NEW, user);
  }

  public getUserInfo(token: string): Observable<User> {
    return this.http.get<User>(Constants.API_USER_INFO);
  }
  
}
