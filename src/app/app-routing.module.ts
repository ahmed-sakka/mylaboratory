import { ProfilComponent } from './main/profil/profil.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/services/auth.guard';
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
import { ToolDetailsComponent } from './main/tool/tool-details/tool-details.component';
import { PublicationDetailsComponent } from './main/publication/publication-details/publication-details.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: DashboardComponent,
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'members',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
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
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
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
        path: '**',
        redirectTo: '',
      },
    ]
  },
  {
    path: 'events',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
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
        path: ':id/edit',
        pathMatch: 'full',
        component: EventFormComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ]
  },
  {
    path: 'tools',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
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
