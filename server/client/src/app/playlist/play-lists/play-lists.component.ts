import {SpotifyDataService} from './../../services/spotify-data.service';
import {Playlist} from './../../models/spotifyData.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnDestroy} from '@angular/core';
import {PlaylistService} from "../../services/playlist.service";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-play-lists',
  templateUrl: './play-lists.component.html',
  styleUrls: ['./play-lists.component.scss']
})
export class PlayListsComponent {

  public playLists: Observable<Playlist[]>;

  constructor(private spotifyData: SpotifyDataService,
              private router: Router,
              private route: ActivatedRoute,
              private playlistService: PlaylistService) {
    this.playLists = this.route.data.pipe(
      map( res => res['data'])
    );
  }


  handlePlaylist(pl) {
    this.playlistService.setCurrentPlaylist(pl);
    this.router.navigate(['playlist/', pl.playlist_id, {
      snapshotId: pl.snapshot_id,
      totalTracks: pl.tracks.total,
      playlistName: pl.name
    }]);
  }

}
