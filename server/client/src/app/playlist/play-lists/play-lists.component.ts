import {SpotifyDataService} from './../../services/spotify-data.service';
import {Playlist} from './../../models/spotifyData.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnDestroy} from '@angular/core';
import {PlaylistService} from "../../services/playlist.service";
import {map, tap} from "rxjs/operators";
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import {AppStateStore} from "../../store/app-state.store";

@Component({
  selector: 'app-play-lists',
  templateUrl: './play-lists.component.html',
  styleUrls: ['./play-lists.component.scss']
})
export class PlayListsComponent implements OnDestroy {

  public playLists: Playlist[];
  currentUser: string;

  constructor(private spotifyData: SpotifyDataService,
              private router: Router,
              private appStateStore: AppStateStore,
              private route: ActivatedRoute,
              private playlistService: PlaylistService) {
    this.route.data.pipe(
      untilComponentDestroyed(this),
      map( res => res)
    ).subscribe(res => {
      this.playLists = res['data']
    });

    this.appStateStore.state$
      .pipe(untilComponentDestroyed(this))
      .subscribe(res => this.currentUser = res['currentUser'])
  }

  ngOnDestroy(): void {}

  handlePlaylist(pl) {
    this.playlistService.setCurrentPlaylist(pl);
    this.router.navigate(['playlist/', pl.playlist_id, {
      snapshotId: pl.snapshot_id,
      totalTracks: pl.tracks.total,
      playlistName: pl.name
    }]);
  }

}
