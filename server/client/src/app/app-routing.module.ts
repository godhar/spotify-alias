import {PlayListsComponent} from './playlist/play-lists/play-lists.component';
import {PlayListComponent} from './playlist/play-list/play-list.component';
import {AuthGuard} from './auth/auth.guard';
import {LoginComponent} from './login/login.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SearchComponent} from "./search/search.component";
import {
  DisplayTracksResolverService
} from "./search/display-tracks/display-tracks-resolver.service";
import {PlayListsResolverService} from "./playlist/play-lists/playlists-resolver.service";


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
    canActivate: [AuthGuard],
    component: PlayListsComponent,
    resolve: {data: PlayListsResolverService}
  },

  {
    path: 'playlist/:id',
    canActivate: [AuthGuard],
    component: PlayListComponent
  },
  {
    path: 'search',
    canActivate: [AuthGuard],
    component: SearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule],
  providers: [DisplayTracksResolverService, PlayListsResolverService]
})
export class AppRoutingModule {
}


