import {PlaylistService} from '../../shared/services/playlist.service';
import {PlaylistDataSource} from './playlist-data-source';
import {Component, OnInit, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatDialogConfig, MatIconRegistry, MatPaginator, MatSort} from '@angular/material';
import {map, tap} from 'rxjs/operators';
import {merge} from 'rxjs';
import {PopUpComponent} from "../../shared/pop-up/pop-up.component";
import {DomSanitizer} from "@angular/platform-browser";
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import {AppStateStore} from "../../store/app-state.store";
import {Playlist} from "../../models/spotifyData.model";

@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.scss']
})
export class PlayListComponent implements OnInit, AfterViewInit, OnDestroy {

  id: string;
  playlist: Playlist;
  dataSource: PlaylistDataSource;
  displayedColumns = ['trackNum', 'trackName', 'pName', 'duration', 'artist', 'delete'];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute,
              private playlistService: PlaylistService,
              private dialog: MatDialog,
              private appState: AppStateStore,
              private router: Router,
              iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer
  ) {
    this.appState.state$.pipe(untilComponentDestroyed(this))
      .subscribe(res => this.playlist = res['currentPlaylist']);

    iconRegistry.addSvgIcon(
      'round-playlist-add',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/round-playlist-add.svg'));
  }


  ngOnInit() {
    this.dataSource = new PlaylistDataSource(this.playlistService);
    this.dataSource.loadPlaylist(this.playlist.playlist_id, '', 'asc', 0, 6);
  }


  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadPlaylistPage())
      ).subscribe();
  }


  loadPlaylistPage() {
    this.dataSource.loadPlaylist(
      this.playlist.playlist_id, '', this.sort.direction,
      this.paginator.pageIndex, this.paginator.pageSize);
  }


  onRowClicked(track) {
    this.playlistService.removeItemFromPlaylist(track.track_uri, this.playlist.snapshot_id, this.playlist.playlist_id, track.track_number)
      .pipe(
        untilComponentDestroyed(this),
        map(res => {
          if (res['status'] === 200) {
            this.playlist.snapshot_id = res['snapshot_id'];
            this.openPopUp(track.track_name);
          } else {
            this.openPopUp('Error ' + res['status'] + ': unable to delete track from ' + this.playlist.name);
          }
        })
      ).subscribe(() => {
        this.appState.addCurrentPlaylist(this.playlist);
        this.loadPlaylistPage();
    })
  }


  openPopUp(msg: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      deleteTrack: true,
      title: 'Delete track',
      content: `${msg} deleted from ${this.playlist.name}`
    };

    this.dialog.open(PopUpComponent, dialogConfig);
  }


  newPlaylistTrack() {
    this.router.navigate(['../playlist-edit'], {relativeTo: this.route.parent});
  }

  ngOnDestroy(): void {}

}
