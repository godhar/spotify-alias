import {PlayListsComponent} from './playlist/play-lists/play-lists.component';
import {PlayListComponent} from './playlist/play-list/play-list.component';
import {AuthGuard} from './auth/auth.guard';
import {LoginComponent} from './login/login.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {
  DisplayTracksResolverService
} from "./search/display-tracks/display-tracks-resolver.service";
import {PlayListsResolverService} from "./playlist/play-lists/playlists-resolver.service";
import {PlaylistAddComponent} from "./playlist/playlist-add/playlist-add.component";
import {DisplayTracksComponent} from "./search/display-tracks/display-tracks.component";
import {PlaylistNewComponent} from "./playlist/playlist-new/playlist-new.component";
import {HeaderComponent} from "./core/header/header.component";
import {LoginResolver} from "./login/login.resolver";


const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: PlayListsComponent,
    resolve: {data: PlayListsResolverService}
  },

  {
    path: 'login',
    component: LoginComponent,
    resolve: {data : LoginResolver}
  },
  {
    path: 'navbar',
    // canActivate: [AuthGuard],
    component: HeaderComponent
  },
  {
    path: 'playlists',
    component: PlayListsComponent,
    canActivate:[AuthGuard],
    resolve: {data: PlayListsResolverService}
  },
  {
    path: 'callback/success',
    pathMatch: 'full',
    redirectTo: 'login'
  },

  {
    path: 'playlist/:id',
    canActivate: [AuthGuard],
    component: PlayListComponent
  },
  {
    path: 'playlist-add/:id',
    canActivate: [AuthGuard],
    component: PlaylistAddComponent
  },
  {
    path: 'playlist-new',
    component: PlaylistNewComponent
  },
  {
    path: 'display-tracks/:type/:id',
    canActivate: [AuthGuard],
    resolve: {trackData: DisplayTracksResolverService},
    component: DisplayTracksComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [DisplayTracksResolverService, PlayListsResolverService, DisplayTracksResolverService, LoginResolver]
})
export class AppRoutingModule {
}


