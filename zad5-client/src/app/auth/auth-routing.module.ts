import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginPageComponent } from "./login-page/login-page.component";
import { RegisterPageComponent } from "./register-page/register-page.component";
import { AuthLayoutComponent } from "./shared/auth-layout/auth-layout.component";

const routes : Routes = [
    { path: '', component: AuthLayoutComponent, children: [
        { path: '', component: LoginPageComponent },
        { path: 'login', component: LoginPageComponent },
        { path: 'register', component: RegisterPageComponent },
      ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}