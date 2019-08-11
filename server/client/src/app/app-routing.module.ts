import {AuthGuard} from './core/auth/auth.guard';
import {LoginComponent} from './core/login/login.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {
  DisplayTracksResolverService
} from "./playlist-edit/display-tracks/display-tracks-resolver.service";
import {PlayListsResolverService} from "./playlist-view/play-lists/playlists-resolver.service";
import {LoginResolver} from "./core/login/login.resolver";
import {NotFoundComponent} from "./shared/not-found/not-found.component";
import {NotFoundResolver} from "./shared/not-found/not-found.resolver";


const routes: Routes = [

  {
    path: 'playlists',
    canLoad: [AuthGuard],
    loadChildren: './playlist-view/playlist-view.module#PlaylistViewModule'
  },
  {
    path: 'playlist-edit',
    canLoad: [AuthGuard],
    loadChildren: './playlist-edit/playlist-edit.module#PlaylistEditModule'
  },
  {
    path: 'callback/success',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent,
    resolve: {data : LoginResolver}
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: '**',
    component: NotFoundComponent,
    resolve: {data : NotFoundResolver}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule],
  providers: [DisplayTracksResolverService, PlayListsResolverService, DisplayTracksResolverService, LoginResolver]
})
export class AppRoutingModule {
}














// const routes: Routes = [
//
//   {
//     path: 'playlists',
//     canLoad: [AuthGuard],
//     loadChildren: 'app/playlist-view/playlist-view.module#PlaylistViewModule'
//   },
//
//   {
//     path: 'login',
//     component: LoginComponent,
//     resolve: {data : LoginResolver}
//   },
//   {
//     path: 'navbar',
//     // canActivate: [AuthGuard],
//     component: HeaderComponent
//   },
//   {
//     path: 'playlists',
//     component: PlayListsComponent,
//     canLoad:[AuthGuard],
//     resolve: {data: PlayListsResolverService}
//   },
//   {
//     path: 'callback/success',
//     pathMatch: 'full',
//     redirectTo: 'login'
//   },
//
//   {
//     path: 'playlist/:id',
//     canActivate: [AuthGuard],
//     component: PlayListComponent
//   },
//   {
//     path: 'playlist-add/:id',
//     canActivate: [AuthGuard],
//     component: PlaylistAddComponent
//   },
//   {
//     path: 'playlist-new',
//     component: PlaylistNewComponent
//   },
//   {
//     path: 'display-tracks/:type/:id',
//     canActivate: [AuthGuard],
//     resolve: {trackData: DisplayTracksResolverService},
//     component: DisplayTracksComponent
//   }
// ];
