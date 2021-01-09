import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MemberListComponent } from './main/member/member-list/member-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MemberFormComponent } from './main/member/member-form/member-form.component';
import { SharedModule } from '../@root/shared.module';
import { LayoutComponent } from './layout/layout.component';
import { EventListComponent } from './main/event/event-list/event-list.component';
import { EventFormComponent } from './main/event/event-form/event-form.component';
import { ToolListComponent } from './main/tool/tool-list/tool-list.component';
import { ToolFormComponent } from './main/tool/tool-form/tool-form.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { PublicationListComponent } from './main/publication/publication-list/publication-list.component';
import { PublicationFormComponent } from './main/publication/publication-form/publication-form.component';
import { FirebaseModule } from 'src/@root/firebase/firebase.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/services/token.interceptor';
import { LoginComponent } from './main/auth/login/login.component';
import { AuthenticationService } from 'src/services/authentication.service';
import { ProfilComponent } from './main/profil/profil.component';


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
    LoginComponent,
    ProfilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    FirebaseModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
