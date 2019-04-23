import { Router } from '@angular/router';
import { SpotifyDataService } from './../../spotifyData/spotify-data.service';
import { Playlist } from './../../shared/playlist.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-play-lists',
  templateUrl: './play-lists.component.html',
  styleUrls: ['./play-lists.component.scss']
})
export class PlayListsComponent implements OnInit {

  public playlists: Playlist[] = [];

  constructor(private spotifyData: SpotifyDataService, private router: Router) { }

  ngOnInit() {
    this.spotifyData.fetchAllPlaylist()
      .subscribe((res) => {
        this.playlists = res;
        console.log('playlists ==== ', res);
      });
  }

  handlePlaylist(e) {
    this.router.navigate(['playlist/', e.playlistId])
  }


}
