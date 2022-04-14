import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: "", redirectTo: "messages/incoming", pathMatch: "full"},
  { path: "auth", loadChildren: () => import('././auth-page/auth.module').then(m => m.AuthModule) },
  { path: "messages", loadChildren: () => import('././messenger-page/messenger.module').then(m => m.MessengerModule), canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
