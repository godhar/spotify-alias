import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {Album, Artist, Playlist, Track} from "../../models/spotifyData.model";
import {AppStateStore} from "../../core/store/app-state.store";
import {PlaylistService} from "../../core/services/playlist.service";
import {MatDialog, MatDialogConfig, MatIconRegistry} from "@angular/material";
import {PopUpComponent} from "../../shared/pop-up/pop-up.component";
import {DomSanitizer} from "@angular/platform-browser";
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";

@Component({
  selector: 'app-display-result',
  templateUrl: './display-result.component.html',
  styleUrls: ['./display-result.component.scss']
})
export class DisplayResultComponent implements OnDestroy{

  @Input() item: Track | Artist | Album;
  @Input() category: string;
  @Output() showTracksSelected = new EventEmitter<Artist | Album>();
  @Output() navToActivePlaylist = new EventEmitter<boolean>();

  private currentPlaylist: Playlist;

  constructor(private store: AppStateStore,
              private playlistService: PlaylistService,
              private dialog: MatDialog,
              iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer) {
    this.store.state$.subscribe(res => this.currentPlaylist = res.currentPlaylist)
    iconRegistry.addSvgIcon(
      'round-playlist-add',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/round-playlist-add.svg'));
  }

  getTracks(item: Album | Artist) {
    this.showTracksSelected.emit(item);
  }

  addTrackToPlaylist(track: Track) {
    return this.playlistService.addTrackToCurrentPlaylist(track.uri, this.currentPlaylist.playlist_id)
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        res => {
          if (res.snapshot_id) {
            this.currentPlaylist.snapshot_id = res.snapshot_id;
            this.store.addCurrentPlaylist(this.currentPlaylist);
            this.openPopUp(track.name)
          }
        }
      )
  }

  ngOnDestroy(): void {}

  openPopUp(msg: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      addTrack: true,
      title: 'Add track',
      content: msg + ' has been added to ' + this.currentPlaylist.name
    };

    this.dialog.open(PopUpComponent, dialogConfig);
    this.dialog.afterAllClosed
      .pipe(untilComponentDestroyed(this))
      .subscribe(() => this.navToActivePlaylist.emit(true))
  }
}
