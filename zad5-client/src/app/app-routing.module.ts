import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", loadChildren: () => import('././messenger-page/messenger.module').then(m => m.MessengerModule) },
  { path: "auth", loadChildren: () => import('././auth-page/auth.module').then(m => m.AuthModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
