import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import  { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // header = "http://localhost:3000";
  header = "";

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

  validateUsername(username): Observable<any> {
    return this.http.get<any>(this.header+"/users/checkusername/?username="+username)
    .pipe(catchError(this.errorHandler));
  }

  validateEmail(email): Observable<any> {
    return this.http.get<any>(this.header+"/users/checkemail/?email="+email)
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

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.header+"/users").pipe(
      catchError(this.errorHandler)
    )
  }

  deleteUser(id): Observable<User[]> {
    return this.http.delete<User[]>(this.header+"/users/"+id).pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  constructor(private http: HttpClient, private _router: Router) { }
}
