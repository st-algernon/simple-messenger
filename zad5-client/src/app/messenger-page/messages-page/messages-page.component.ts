import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MessagesHub } from 'src/app/shared/hubs/messages.hub';
import { Message, MessageView } from 'src/app/shared/interfaces';
import { MessagesService } from 'src/app/shared/services/messages.service';

@Component({
  selector: 'app-messages-page',
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MessagesPageComponent implements OnInit {

  urlParams: 'incoming' | 'sent' = 'incoming';
  columnsToDisplay = ['authorName', 'body', 'creationDate'];
  expandedElement: Message | undefined;
  messageViews: MessageView[] = [];
  subs: Subscription[] = [];

  @ViewChild(MatTable) table: MatTable<MessageView[]> | undefined;

  constructor(
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private messagesHub: MessagesHub
    ) { }

  ngOnInit(): void {
    this.urlParams = this.route.snapshot.params['type'];
    
    this.subs.push(
      this.route.params.pipe(
        switchMap((params: Params) => this.messagesService.getMessagesByType(params['type']))
      ).subscribe(
        (messages: Message[]) => { 
          this.messageViews = messages.map(m => this.convertToMessageView(m));
        }
      ),

      this.messagesHub.message$.subscribe((message: Message) => {
        this.messageViews.unshift(
          this.convertToMessageView(message)
        )
        this.table?.renderRows();
      })
    );
  }

  convertToMessageView(message: Message): MessageView {
    return {
      id: message.id,
      contact: this.urlParams == 'incoming' ? message.author : message.recipient,
      subject: message.subject,
      text: message.text,
      creationDate: message.creationDate
    }
  }
}
