import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, Observable, ReplaySubject } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User, UsersResponse } from "../interfaces";

@Injectable({ providedIn: 'root' }) 
export class UsersService {

    private _me$ = new ReplaySubject<User>();
    
    get me$(): ReplaySubject<User> {

        if (localStorage.me == null) {
            this.getCurrent().subscribe(
                (user: User) => {
                    localStorage.me = JSON.stringify(user);
                },
                (error) => {
                    console.log(error);
                },
                () => { 
                    this._me$.next(JSON.parse(localStorage.me));
                }
            );
        } else {
            this._me$.next(JSON.parse(localStorage.me));
        }

        return this._me$;
    }

    constructor(
        private http: HttpClient
    ) {}

    getUser(username: string): Observable<User> {
        return this.http.get<UsersResponse>(`${environment.apiUrl}/api/users/${username}`)
        .pipe(
            map((response: UsersResponse) => response.users[0]),
        );
    }

    getCurrent(): Observable<User> {
        return this.http.get<UsersResponse>(`${environment.apiUrl}/api/users/current`)
        .pipe(
            map((response: UsersResponse) => response.users[0])
        );
    }

    getContacts(): Observable<User[]> {
        return this.http.get<UsersResponse>(`${environment.apiUrl}/api/users/contacts`)
        .pipe(
            tap(console.log),
            map((response: UsersResponse) => response.users)
        );
    }

    searchUsers(query: string): Observable<User[]> {
        return this.http.get<UsersResponse>(`${environment.apiUrl}/api/users/search/${query}`)
        .pipe(
            tap(console.log),
            map((response: UsersResponse) => response.users)
        );
    }
}
