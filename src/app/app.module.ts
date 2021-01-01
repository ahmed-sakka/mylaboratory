import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MemberListComponent } from './member-list/member-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MemberFormComponent } from './member-form/member-form.component';
import { SharedModule } from '../@root/shared.module';
import { LayoutComponent } from './layout/layout.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventFormComponent } from './event-form/event-form.component';
import { ToolListComponent } from './tool-list/tool-list.component';
import { ToolFormComponent } from './tool-form/tool-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PublicationListComponent } from './publication-list/publication-list.component';
import { PublicationFormComponent } from './publication-form/publication-form.component';


@NgModule({
  declarations: [
    AppComponent,
    MemberListComponent,
    MemberFormComponent,
    LayoutComponent,
    EventListComponent,
    EventFormComponent,
    ToolListComponent,
    ToolFormComponent,
    DashboardComponent,
    PublicationListComponent,
    PublicationFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
