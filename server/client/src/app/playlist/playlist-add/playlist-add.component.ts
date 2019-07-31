import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Album, Artist, Playlist, Track} from "../../models/spotifyData.model";
import {SearchService} from "../../search/search.service";
import {PlaylistService} from "../../services/playlist.service";
import {LoaderService} from "./loader.service";
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import {AppStateStore} from "../../store/app-state.store";

@Component({
  selector: 'app-playlist-add',
  templateUrl: './playlist-add.component.html',
  styleUrls: ['./playlist-add.component.scss']
})
export class PlaylistAddComponent implements OnDestroy {

  readonly playlistId: string;
  private sEntity: Album | Artist | Track;
  private playlist: Playlist;

  constructor(private loadingService: LoaderService,
              private route: ActivatedRoute,
              private search: SearchService,
              private appStateStore: AppStateStore,
              private router: Router,
              private playlistService: PlaylistService) {
    this.playlistId = this.route.snapshot.params.id;

    this.appStateStore.state$
      .pipe(untilComponentDestroyed(this)).subscribe(
      res => {
        this.playlist = res['currentPlaylist'];
      });
  }

  onUpdateNav(confirmTrackAdd: boolean) {
    console.log(confirmTrackAdd)
    this.router.navigate(['playlist', this.playlist.playlist_id])
  }


  handleEntity(entity: Album | Artist | Track) {
    this.sEntity = entity;
  }

  ngOnDestroy(): void {}

  getTracks(entity: Album|Artist): void {
    this.playlistService.setCurrentEntity(entity);//set entity here
    this.router.navigate(['display-tracks', entity.type, entity.id]);
  }
}



