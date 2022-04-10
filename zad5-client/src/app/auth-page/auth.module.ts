import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthPageComponent } from './auth-page.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
      AuthPageComponent
  ],
  imports: [
    AuthRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: []
})
export class AuthModule { }
