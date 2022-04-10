import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatPageComponent } from './chat-page.component';
import { ChatRoutingModule } from './chat-routing.module';

@NgModule({
  declarations: [
      ChatPageComponent
  ],
  imports: [
    ChatRoutingModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: []
})
export class ChatModule { }
