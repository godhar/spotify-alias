import {Playlist} from '../../models/spotifyData.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnDestroy} from '@angular/core';
import {PlaylistService} from "../../core/services/playlist.service";
import {map} from "rxjs/operators";
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import {AppStateStore} from "../../core/store/app-state.store";

@Component({
  selector: 'app-play-lists',
  templateUrl: './play-lists.component.html',
  styleUrls: ['./play-lists.component.scss']
})
export class PlayListsComponent implements OnDestroy {

  public playLists: Playlist[];
  currentUser: string;

  constructor(private router: Router,
              private appStateStore: AppStateStore,
              private route: ActivatedRoute,
              private playlistService: PlaylistService) {
    this.route.data.pipe(
      untilComponentDestroyed(this),
      map( res => res)
    ).subscribe(res => {
      this.playLists = res['data']
    });

    this.appStateStore.addCurrentRoute('playlists');
    this.appStateStore.state$
      .pipe(untilComponentDestroyed(this))
      .subscribe(res => this.currentUser = res['currentUser'])
  }

  ngOnDestroy(): void {
    this.appStateStore.addCurrentRoute('');
  }

  handlePlaylist(pl) {
    this.playlistService.setCurrentPlaylist(pl);
    this.router.navigate(['playlist'], { relativeTo: this.route });
  }

}
