import {NgModule} from '@angular/core';
import {MaterialModule} from "./material/material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ConfirmDialogModule} from "./components/confirm-dialog/confirm-dialog.module";


@NgModule({
  imports: [
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    ConfirmDialogModule,
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    ConfirmDialogModule,
  ],
})
export class SharedModule {
}
