import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HtmlToTextPipe } from '../shared/pipes/htmlToText.pipe';
import { SharedModule } from '../shared/shared.module';
import { MessagesPageComponent } from './messages-page/messages-page.component';
import { MessengerPageComponent } from './messenger-page.component';
import { MessengerRoutingModule } from './messenger-routing.module';

@NgModule({
  declarations: [
    MessengerPageComponent,
    MessagesPageComponent,
    HtmlToTextPipe
  ],
  imports: [
    MessengerRoutingModule,
    SharedModule,
    CommonModule,
  ],
  providers: []
})
export class MessengerModule { }
