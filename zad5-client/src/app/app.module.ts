import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { AuthInterceptor } from './shared/auth.interceptor';
import { AuthGuard } from './shared/auth.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [INTERCEPTOR_PROVIDER, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
