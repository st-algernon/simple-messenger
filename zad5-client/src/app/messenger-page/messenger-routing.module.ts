import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MessagesPageComponent } from "./messages-page/messages-page.component";
import { MessengerPageComponent } from "./messenger-page.component";

const routes : Routes = [
    { path: '', component: MessengerPageComponent, children: [
        {path: ':type', component: MessagesPageComponent }
    ] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MessengerRoutingModule {}