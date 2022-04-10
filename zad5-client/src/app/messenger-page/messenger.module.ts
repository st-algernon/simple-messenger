import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MessengerPageComponent } from './messenger-page.component';
import { MessengerRoutingModule } from './messenger-routing.module';

@NgModule({
  declarations: [
    MessengerPageComponent
  ],
  imports: [
    MessengerRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: []
})
export class MessengerModule { }
