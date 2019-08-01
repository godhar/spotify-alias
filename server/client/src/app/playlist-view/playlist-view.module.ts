import {NgModule} from '@angular/core';
import {PlayListsComponent} from "./play-lists/play-lists.component";
import {RouterModule} from "@angular/router";
import {PlayListsResolverService} from "./play-lists/playlists-resolver.service";
import {PlayListComponent} from "./play-list/play-list.component";
import {SharedModule} from "../shared/shared.module";
import {NotFoundComponent} from "../not-found/not-found.component";


const ROUTES = [

  {
    path: '',
    component: PlayListsComponent,
    resolve: {data: PlayListsResolverService},
  },
  {
    path: 'playlist',
    component: PlayListComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [PlayListsComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  providers: [PlayListsResolverService]
})
export class PlaylistViewModule {}
