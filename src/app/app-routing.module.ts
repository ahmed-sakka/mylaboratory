import { EncadrementsComponent } from './main/encadrements/encadrements.component';
import { ProfilComponent } from './main/profil/profil.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './main/auth/login/login.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { EventFormComponent } from './main/event/event-form/event-form.component';
import { EventListComponent } from './main/event/event-list/event-list.component';
import { MemberFormComponent } from './main/member/member-form/member-form.component';
import { MemberListComponent } from './main/member/member-list/member-list.component';
import { PublicationFormComponent } from './main/publication/publication-form/publication-form.component';
import { PublicationListComponent } from './main/publication/publication-list/publication-list.component';
import { ToolFormComponent } from './main/tool/tool-form/tool-form.component';
import { ToolListComponent } from './main/tool/tool-list/tool-list.component';
import { EventParticeptionComponent } from './main/event/event-partiception/event-partiception.component';
import { PublicationMemberComponent } from './main/publication/publication-member/publication-member.component';
import { TollsMembersComponent } from './main/tool/tolls-members/tolls-members.component';

import { ToolDetailsComponent } from './main/tool/tool-details/tool-details.component';
import { PublicationDetailsComponent } from './main/publication/publication-details/publication-details.component';
import { EventDetailsComponent } from './main/event/event-details/event-details.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: '',
    pathMatch: 'full',
    component: DashboardComponent,
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'encadrements',
    pathMatch: 'full',
    component: EncadrementsComponent,
  },
  {
    path: 'members',
   
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: MemberListComponent,
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: MemberFormComponent,
      },
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: MemberFormComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ]
  },
  {
    path: 'publications',
   
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: PublicationListComponent,
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: PublicationFormComponent,
      },
      {
        path: ':id',
        pathMatch: 'full',
        component: PublicationDetailsComponent,
      },
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: PublicationFormComponent,
      },
      {
        path: ':id/PublicationMembers',
        pathMatch: 'full',
        component: PublicationMemberComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ]
  },
  {
    path: 'events',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: EventListComponent,
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: EventFormComponent,
      },
      {
        path: ':id',
        pathMatch: 'full',
        component: EventDetailsComponent,
      },
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: EventFormComponent,
      },
      {
        path: ':id/participation',
        pathMatch: 'full',
        component: EventParticeptionComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ]
  },
  {
    path: 'tools',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ToolListComponent,
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: ToolFormComponent,
      },
      {
        path: ':id',
        pathMatch: 'full',
        component: ToolDetailsComponent,
      },
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: ToolFormComponent,
      },
      {
        path: ':id/toolsMembers',
        pathMatch: 'full',
        component: TollsMembersComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ]
  },
  {
    path: 'profile/:id',
    component: ProfilComponent
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
