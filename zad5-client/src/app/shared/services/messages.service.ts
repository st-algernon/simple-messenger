import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, Observable, ReplaySubject } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Message, MessageRequest, MessagesResponse, MessageView, User, UsersResponse } from "../interfaces";

@Injectable({ providedIn: 'root' }) 
export class MessagesService {
    
    constructor(private http: HttpClient) {}
    
    getMessagesByType(type: string): Observable<Message[]> {
        return this.http.get(`${environment.apiUrl}/api/messages/${type}`).pipe(
            tap(console.log),
            map((response: MessagesResponse) => response.messages)
        );
    }
}
