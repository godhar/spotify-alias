import {SpotifyDataService} from './../../services/spotify-data.service';
import {Playlist} from './../../models/spotifyData.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnDestroy} from '@angular/core';
import {PlaylistService} from "../../services/playlist.service";
import {map, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";

@Component({
  selector: 'app-play-lists',
  templateUrl: './play-lists.component.html',
  styleUrls: ['./play-lists.component.scss']
})
export class PlayListsComponent implements OnDestroy {

  public playLists: Observable<Playlist[]>;

  constructor(private spotifyData: SpotifyDataService,
              private router: Router,
              private route: ActivatedRoute,
              private playlistService: PlaylistService) {
    this.playLists = this.route.data.pipe(
      untilComponentDestroyed(this),
      tap( res => console.log('got ma pls  ', res)),
      map( res => res['data'])
    );
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
