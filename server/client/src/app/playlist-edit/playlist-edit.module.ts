import {NgModule} from '@angular/core';
import {PlaylistAddComponent} from "./playlist-add/playlist-add.component";
import {DisplayTracksResolverService} from "./display-tracks/display-tracks-resolver.service";
import {DisplayTracksComponent} from "./display-tracks/display-tracks.component";
import {RouterModule} from "@angular/router";
import {SearchComponent} from "./search/search.component";
import {PlayListComponent} from "../playlist-view/play-list/play-list.component";
import {MatAutocompleteModule, MatCheckboxModule} from "@angular/material";
import {SearchService} from "./search/search.service";
import {SharedModule} from "../shared/shared.module";
import {DisplayResultComponent} from "./display-result/display-result.component";
import {PlaylistEditComponent} from "./playlist-edit/playlist-edit.component";
import {NotFoundComponent} from "../shared/not-found/not-found.component";
import {NotFoundResolver} from "../shared/not-found/not-found.resolver";


const ROUTES = [
  {
    path: "",
    component: PlaylistEditComponent,
    children: [
      {
        path: "",
        pathMatch: 'full',
        redirectTo: 'playlist-add'
      },
      {
        path: 'playlist-add',
        component: PlaylistAddComponent
      },
      {
        path: 'display-tracks/:type/:id',
        resolve: {trackData: DisplayTracksResolverService},
        component: DisplayTracksComponent
      },
      {
        path: 'playlist',
        component: PlayListComponent},
      {
        path: '**',
        component: NotFoundComponent,
        resolve: {data: NotFoundResolver}
      }
    ]
  }

];

@NgModule({
  declarations: [
    PlaylistEditComponent,
    PlaylistAddComponent,
    SearchComponent,
    DisplayResultComponent,
    DisplayTracksComponent
  ],
  imports: [
    RouterModule.forChild(ROUTES),
    SharedModule,
    MatAutocompleteModule,
    MatCheckboxModule
  ],
  providers: [DisplayTracksResolverService, SearchService]
})
export class PlaylistEditModule {
}


