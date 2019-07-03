import { AppComponent } from './app.component';
import { PlaylistEditComponent } from './playlist/playlist-edit/playlist-edit.component';
import { PlayListsComponent } from './playlist/play-lists/play-lists.component';
import { SearchComponent } from './search/search.component';
import { PlayListComponent } from './playlist/play-list/play-list.component';
import { AuthGuard } from './auth/auth.guard';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: PlayListsComponent
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'callback/success',
    pathMatch: 'full',
    component: AppComponent
  },

  {
    path: 'playlist/:id',
    component: PlayListComponent
  },
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


