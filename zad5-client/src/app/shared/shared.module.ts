import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupMessageDialogComponent } from './dialogs/group-message-dialog/group-message-dialog.component';
import { MaterialModule } from './material.module';
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  declarations: [
    GroupMessageDialogComponent
  ],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    CommonModule,
    NgxEditorModule,
    FormsModule,
  ],
  exports: [
    MaterialModule
  ]
})
export class SharedModule { }