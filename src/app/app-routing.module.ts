import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleFormComponent } from './article-form/article-form.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventFormComponent } from './event-form/event-form.component';
import { EventListComponent } from './event-list/event-list.component';
import { MemberFormComponent } from './member-form/member-form.component';
import {MemberListComponent} from './member-list/member-list.component';
import { ToolFormComponent } from './tool-form/tool-form.component';
import { ToolListComponent } from './tool-list/tool-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardComponent,
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
    path: 'articles',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ArticleListComponent,
      },
      {
        path: 'create',
        pathMatch: 'full',
        component: ArticleFormComponent,
      },
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: ArticleFormComponent,
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
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
