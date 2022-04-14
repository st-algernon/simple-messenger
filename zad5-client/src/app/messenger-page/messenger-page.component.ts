import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GroupMessageDialogComponent } from '../shared/dialogs/group-message-dialog/group-message-dialog.component';
import { MessagesHub } from '../shared/hubs/messages.hub';
import { Message, User } from '../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';
import { MessagesService } from '../shared/services/messages.service';
import { UsersService } from '../shared/services/users.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-messenger-page',
  templateUrl: './messenger-page.component.html',
  styleUrls: ['./messenger-page.component.scss']
})
export class MessengerPageComponent implements OnInit {

  me: User | undefined;
  contacts: User[] = [];
  subs: Subscription[] = [];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  columnsToDisplay = ['name', 'weight', 'symbol', 'position'];

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private usersService: UsersService,
    private messagesService: MessagesService,
    private messagesHub: MessagesHub,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subs.push(
      this.usersService.me$.subscribe((user: User) => this.me = user),
      this.usersService.getContacts().subscribe((users: User[]) => this.contacts = users)
    );

    this.messagesHub.startConnection();
    this.messagesHub.addReceivedMessageListener();
  }

  openNewMessageDialog(user?: User) {
    const dialogRef = this.dialog.open(GroupMessageDialogComponent, {
      height: 'auto',
      width: '40%',
      data: user
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}