import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import  { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  header = "http://localhost:3000";

  register(user) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.http.post<any>(this.header+"/register", user, {headers})
      .pipe(catchError(this.errorHandler));
  }

  loginUser(user) {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    return this.http.post<any>(this.header+"/login", user, {headers})
      .pipe(catchError(this.errorHandler));

  }

  isLoggedIn() {
    return !!this.getToken()  && !!this.getUsername();
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUsername() {
    return localStorage.getItem('username');
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this._router.navigate(['/login']);
  }

  getUsers(): any {
    return this.http.get<any>(this.header+"/users").pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  constructor(private http: HttpClient, private _router: Router) { }
}
