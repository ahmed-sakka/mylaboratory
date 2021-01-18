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
import { LoginComponent } from './main/auth/login/login.component';
import { AuthenticationService } from 'src/services/authentication.service';
import { ProfilComponent } from './main/profil/profil.component';
import { EventParticeptionComponent } from './main/event/event-partiception/event-partiception.component';
import { PublicationMemberComponent } from './main/publication/publication-member/publication-member.component';
import { ToolMembersComponent } from './main/tool/tool-members/tool-members.component';
import { ToolDetailsComponent } from './main/tool/tool-details/tool-details.component';
import { PublicationDetailsComponent } from './main/publication/publication-details/publication-details.component';
import { EventDetailsComponent } from './main/event/event-details/event-details.component';
import { EncadrementsComponent } from './main/encadrements/encadrements.component';
import { ProfilPublicationsComponent } from './main/profil/profil-publications/profil-publications.component';
import { ProfilToolsComponent } from './main/profil/profil-tools/profil-tools.component';


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
    EventParticeptionComponent,
    PublicationMemberComponent,
    ToolMembersComponent,
    ToolDetailsComponent,
    PublicationDetailsComponent,
    EventDetailsComponent,
    EncadrementsComponent,
    ProfilPublicationsComponent,
    ProfilToolsComponent,
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
    
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
