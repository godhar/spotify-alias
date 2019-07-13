import {PlayListsComponent} from './playlist/play-lists/play-lists.component';
import {PlayListComponent} from './playlist/play-list/play-list.component';
import {AuthGuard} from './auth/auth.guard';
import {LoginComponent} from './login/login.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SearchComponent} from "./search/search.component";
import {DisplayTracksComponent} from "./search/display-tracks/display-tracks.component";
import {
  DisplayTracksResolverService
} from "./search/display-tracks/display-tracks-resolver.service";


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
  },
  {
    path: 'display-result/:type/:id',
    component: DisplayTracksComponent,
    resolve: {trackData: DisplayTracksResolverService}
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule],
  providers: [DisplayTracksResolverService]
})
export class AppRoutingModule {
}


