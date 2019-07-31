import {PlaylistService} from './../../services/playlist.service';
import {SpotifyDataService} from './../../services/spotify-data.service';
import {PlaylistDataSource} from './../../services/playlist-data-source';
import {Component, OnInit, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatDialogConfig, MatIconRegistry, MatPaginator, MatSort} from '@angular/material';
import {map, takeUntil, tap} from 'rxjs/operators';
import {merge, Subject} from 'rxjs';
import {PopUpComponent} from "../../pop-up/pop-up.component";
import {DomSanitizer} from "@angular/platform-browser";
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";

@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.scss']
})
export class PlayListComponent implements OnInit, AfterViewInit, OnDestroy {

  totalTracks: number;
  playlistName: string;
  id: string;
  snapshotId: string;
  private dataSource: PlaylistDataSource;
  displayedColumns = ['trackNum', 'trackName', 'pName', 'duration', 'artist', 'delete'];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute,
              private spotifyData: SpotifyDataService,
              private playlistService: PlaylistService,
              private dialog: MatDialog,
              private router: Router,
              iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.snapshotId = this.route.snapshot.paramMap.get('snapshotId');
    this.totalTracks = +this.route.snapshot.paramMap.get('totalTracks');
    this.playlistName = this.route.snapshot.paramMap.get('playlistName');

    iconRegistry.addSvgIcon(
      'round-playlist-add',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/round-playlist-add.svg'));
  }


  ngOnInit() {
    this.dataSource = new PlaylistDataSource(this.playlistService);
    this.dataSource.loadPlaylist(this.id, '', 'asc', 0, 6);
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
      this.id, '', this.sort.direction,
      this.paginator.pageIndex, this.paginator.pageSize);
  }


  onRowClicked(track) {
    this.spotifyData.removeItemFromPlaylist(track.track_uri, this.snapshotId, this.id, track.track_number)
      .pipe(
        untilComponentDestroyed(this),
        map(res => {
          if (res['status'] === 200) {
            this.snapshotId = res['snapshot_id'];
            this.openPopUp(track.track_name);
          } else {
            this.openPopUp('Error ' + res['status'] + ': unable to delete track from ' + this.playlistName);
          }

        })
      ).subscribe(() => {
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
      content: `${msg} deleted from ${this.playlistName}`
    };

    this.dialog.open(PopUpComponent, dialogConfig);
  }


  newPlaylistTrack() {
    this.router.navigate(['/playlist-add', this.id]);
  }

  ngOnDestroy(): void {}

}
