import { PlayListsComponent } from './playlist/play-lists/play-lists.component';
import { PlayListComponent } from './playlist/play-list/play-list.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchComponent} from "./search/search.component";


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: PlayListsComponent
  },

  {
    path: 'login',
    canActivate: [AuthGuard],
    component: LoginComponent
  },

  {
    path: 'callback/success',
    pathMatch: 'full',
    component: PlayListsComponent
  },

  {
    path: 'playlist/:id',
    component: PlayListComponent
  },
  {
    path: 'search',
    component: SearchComponent
  }
  //   {
  //   path: 'playlist/:id/edit',
  //   pathMatch: 'full',
  //   component: PlaylistEditComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


