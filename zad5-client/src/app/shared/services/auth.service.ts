import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AuthResponse, LoginRequest, RegisterRequest, TokenRequest } from "../interfaces";

@Injectable({ providedIn: "root" })
export class AuthService {

  get token(): string | null {

    const expDate = new Date(localStorage.getItem("token-exp") as string);

    if (new Date() > expDate) {
      this.logout();
      return null;
    }

    return localStorage.getItem('token');
  }

  get refreshToken(): string | null {
    return localStorage.getItem('refresh-token');
  }

  constructor(private http: HttpClient) {}

  login(loginRequest: LoginRequest) {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/auth/login`, loginRequest)
      .pipe(
        tap(this.setTokens),
        catchError((error) => {
          console.log(error);
          return throwError(error);
        })
      );
  }

  register(registerRequest: RegisterRequest) {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/auth/register`, registerRequest)
      .pipe(
        tap(this.setTokens),
        catchError((error) => {
          console.log(error);
          return throwError(error);
        })
      );
  }

  updateToken() {
    const request: TokenRequest = {
      token: this.token as string,
      refreshToken: this.refreshToken as string
    }

    return this.http.put<AuthResponse>(`${environment.apiUrl}/auth/refresh`, request)
      .pipe(
        tap(this.setTokens),
        catchError((error) => {
          console.log(error);
          return throwError(error);
        })
      );
  }

  logout() {
    this.setTokens(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setTokens(response: AuthResponse | null) {
    if (response) {
      const expDate = new Date(
        new Date().getTime() + +response.expiresIn * 60 * 1000
      );
      localStorage.setItem("token", response.token);
      localStorage.setItem("refresh-token", response.refreshToken);
      localStorage.setItem("token-exp", expDate.toString());
    } else {
      localStorage.clear();
    }
  }
}
