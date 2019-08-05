import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Album, Artist, Playlist, Track} from "../../models/spotifyData.model";
import {SearchService} from "../search/search.service";
import {PlaylistService} from "../../shared/services/playlist.service";
import {LoaderService} from "../../shared/loader/loader.service";
import {AppStateStore} from "../../store/app-state.store";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-playlist-add',
  templateUrl: './playlist-add.component.html',
  styleUrls: ['./playlist-add.component.scss']
})
export class PlaylistAddComponent implements OnDestroy {

  sEntity: Album | Artist | Track = null;
  playlist: Playlist;

  constructor(private loadingService: LoaderService,
              private route: ActivatedRoute,
              private search: SearchService,
              private appStateStore: AppStateStore,
              private router: Router,
              private playlistService: PlaylistService) {
    this.appStateStore.state$
      .pipe(take(1))
      .subscribe( res => {
        this.playlist = res['currentPlaylist']
      });
  }

  onUpdateNav() {
    this.router.navigate(['playlist', {id: this.playlist.playlist_id}], { relativeTo: this.route.parent })
  }

  handleEntity(entity: Album | Artist | Track) {
    this.sEntity = entity;
  }

  ngOnDestroy(): void {}

  getTracks(entity: Album|Artist): void {
    this.playlistService.setCurrentEntity(entity);//set entity here
    this.router.navigate(['../display-tracks', entity.type, entity.id], {relativeTo: this.route});
  }
}


