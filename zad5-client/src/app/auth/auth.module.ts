import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterPageComponent,
    AuthLayoutComponent
  ],
  imports: [
    AuthRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: []
})
export class AuthModule { }
