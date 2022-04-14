import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { MessagesHub } from '../../hubs/messages.hub';
import { MessageRequest, User } from '../../interfaces';
import { MessagesService } from '../../services/messages.service';
import { UsersService } from '../../services/users.service';
import { Editor, toHTML } from 'ngx-editor';

@Component({
  selector: 'app-group-message-dialog',
  templateUrl: './group-message-dialog.component.html',
  styleUrls: ['./group-message-dialog.component.scss']
})
export class GroupMessageDialogComponent implements OnInit, OnDestroy {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  foundUsers$: Observable<User[]>;
  recipients: User[] = [];
  messageForm: FormGroup;
  subs: Subscription[] = [];

  editor: Editor = new Editor();
  html: string = '';

  get recipientCtrl() {
    return this.messageForm.controls['recipient'];
  }

  get subjectCtrl() {
    return this.messageForm.controls['subject'];
  }

  get textCtrl() {
    return this.messageForm.controls['text'];
  }

  @ViewChild('userInput') userInput: ElementRef<HTMLInputElement> | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User,
    private usersService: UsersService,
    private messagesHub: MessagesHub
  ) {
    this.messageForm = new FormGroup ({
      recipient: new FormControl(),
      subject: new FormControl(null),
      text: new FormControl(null, [Validators.required])
    });
    
    this.foundUsers$ = this.recipientCtrl.valueChanges.pipe(
      switchMap((username: string) => this.search(username))
    );
  }

  ngOnInit(): void {
    if (this.data) {
      this.recipients.push(this.data);
    }
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  onSubmit() {

    if (this.messageForm.invalid) {
      return;
    }

    const messageRequest: MessageRequest = {
      recipientIds: this.recipients.map(u => u.id),
      subject: this.subjectCtrl.value,
      text: toHTML(this.textCtrl.value),
    };

    console.log(messageRequest);

    this.messagesHub.sendMessage(messageRequest);
  }

  add(event: MatChipInputEvent): void {
    console.log('func add');
    const value = event.value.toLowerCase().trim();

    if(this.recipients.filter(u => u.username == value).length == 0) {
      this.subs.push(
        this.usersService.getUser(value).subscribe((user: User) => {
          this.recipients.push(user)
        })
      );
    }

    event.chipInput?.clear();
    this.recipientCtrl.setValue(null);
  }

  remove(user: User): void {
    const index = this.recipients.indexOf(user);

    if (index >= 0) {
      this.recipients.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const user = event.option.value as User;
    
    if (this.recipients.filter(u => u.username == user.username).length == 0) {
      this.recipients.push(user);
    }

    if (this.userInput)
      this.userInput.nativeElement.value = '';

    this.recipientCtrl.setValue(null);
  }

  search(value: string): Observable<User[]> {
    return this.usersService.searchUsers(value);
  }

}
