import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message, MessageRequest } from '../interfaces';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' }) 
export class MessagesHub {

    private hubConnection: signalR.HubConnection;
    public message$ = new Subject<Message>();

    constructor (
        private auth: AuthService
    ) {
        this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(`${environment.apiUrl}/hubs/messages`, { accessTokenFactory: () => this.auth.token ?? '' })
        .build();
    }
    
    startConnection() {
        this.hubConnection
          .start()
          .then(() => console.log('Connection started'))
          .catch((err: string) => console.log('Error while starting connection: ' + err))
    }

    addReceivedMessageListener() {
        this.hubConnection.on("Receive", (message: Message) => {
            this.message$.next(message);
        });
    }

    sendMessage(request: MessageRequest) {
        console.log(this.hubConnection.state);
        this.hubConnection.invoke('Send', request);
    }
}