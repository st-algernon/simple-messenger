import { NgModule } from '@angular/core';
import { GroupMessageDialogComponent } from './dialogs/group-message-dialog/group-message-dialog.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    GroupMessageDialogComponent
  ],
  imports: [
      MaterialModule,
  ],
  exports: [
      MaterialModule
  ]
})
export class SharedModule { }