import {AuthGuard} from './core/auth/auth.guard';
import {LoginComponent} from './core/login/login.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NotFoundComponent} from "./shared/not-found/not-found.component";
import {LoginResolver} from "./core/login/login.resolver";
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoginResolver]
})
export class AppRoutingModule {
}
