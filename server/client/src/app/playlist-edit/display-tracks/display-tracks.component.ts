import {Component, OnDestroy} from '@angular/core';
import {Album, Artist, Playlist, TrackFull} from "../../models/spotifyData.model";
import {SearchService} from "../search/search.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {PlaylistService} from "../../core/services/playlist.service";
import {delay, switchMap, take, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {AppStateStore} from "../../core/store/app-state.store";
import {PopUpComponent} from "../../shared/pop-up/pop-up.component";
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";


@Component({
  selector: 'app-display-track',
  templateUrl: './display-tracks.component.html',
  styleUrls: ['./display-tracks.component.scss']
})
export class DisplayTracksComponent implements OnDestroy {

  dataSource: Observable<TrackFull[]>;
  resolverEvent$: Observable<Observable<TrackFull[]>> | Observable<any>;
  private playlist: Playlist;
  private currentEntity: Album | Artist;
  loading: boolean = false;
  displayedColumns = ["name", "album", "artist", "duration", "externalSource"];

  constructor(private router: Router,
              private searchService: SearchService,
              private activatedRoute: ActivatedRoute,
              private playlistService: PlaylistService,
              private appStateStore: AppStateStore,
              private dialog: MatDialog
  ) {

    this.playlistService.passStream()
      .pipe(untilComponentDestroyed(this))
      .subscribe(res => {
        if (res) {
          this.navToCurrentPlaylist();
        }
      });

    this.appStateStore.state$
      .pipe(untilComponentDestroyed(this)).subscribe(
      res => {
        this.playlist = res['currentPlaylist'];
        this.currentEntity = res['currentEntity'];
      });

    this.resolverEvent$ = this.activatedRoute.data
      .pipe(
        untilComponentDestroyed(this),
        tap(() => this.loading = true),
        take(1),
        delay(5000),
        switchMap((data) => data.trackData));

    this.resolverEvent$.subscribe(
      res => {
        this.dataSource = res;
        this.loading = false;
      },
      error => console.error(error)
    );

    this.appStateStore.addCurrentRoute('display-tracks');
  }

  ngOnDestroy(): void {
    this.appStateStore.addCurrentRoute('');
  }

  navigateToSearch() {
    this.router.navigate(['./playlist-add'], {relativeTo: this.activatedRoute.parent});
  }

  onSelect(track: TrackFull) {
    this.playlistService.addTrackToCurrentPlaylist(track.track_uri, this.playlist.playlist_id)
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        res => {
          if (res.snapshot_id) {
            this.playlist.snapshot_id = res.snapshot_id;
            this.appStateStore.addCurrentPlaylist(this.playlist);
            this.openPopUp(track.name);
          }
        }
      )
  }

  openPopUp(msg: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      addTrack: true,
      title: 'Add track',
      content: msg + ' has been added to ' + this.playlist.name
    };

    this.dialog.open(PopUpComponent, dialogConfig);
  }

  navToCurrentPlaylist(): void {
    this.router.navigate(['./playlist',{id: this.playlist.playlist_id}], {relativeTo: this.activatedRoute.parent})
  }
}
