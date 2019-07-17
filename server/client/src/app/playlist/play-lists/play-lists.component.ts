import { SpotifyDataService } from './../../services/spotify-data.service';
import { Playlist } from './../../models/spotifyData.model';
import {ActivatedRoute, Router} from '@angular/router';
import { Component} from '@angular/core';

@Component({
  selector: 'app-play-lists',
  templateUrl: './play-lists.component.html',
  styleUrls: ['./play-lists.component.scss']
})
export class PlayListsComponent {

  public playLists: Playlist[];

  constructor(private spotifyData: SpotifyDataService, private router: Router, private route: ActivatedRoute) {
    this.route.data.subscribe(
      (res: Playlist[]) => this.playLists = res['data']
    )
  }


  handlePlaylist(e) {
    console.log(e);
    this.router.navigate(['playlist/', e.playlist_id, {snapshotId: e.snapshot_id, totalTracks: e.tracks.total, playlistName: e.name}])
  }


}
