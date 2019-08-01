import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {
  concatMap,
  debounceTime,
  distinctUntilChanged, exhaustMap,
  finalize,
  first,
  map,
  mergeAll,
  switchMap,
  take,
  tap
} from "rxjs/operators";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {PopUpComponent} from "../../shared/pop-up/pop-up.component";
import {AppStateStore} from "../../store/app-state.store";
import {Playlist} from "../../models/spotifyData.model";
import {fromEvent, merge, Observable, of, pipe, Subject} from "rxjs";
import {PlaylistService} from "../../shared/services/playlist.service";

@Component({
  selector: 'app-playlist-new',
  templateUrl: './playlist-new.component.html',
  styleUrls: ['./playlist-new.component.scss']
})
export class PlaylistNewComponent implements OnInit {

  value: FormControl;
  playlist: Playlist;
  popUpListener$: Observable<any>;
  outerObservable$: Observable<any>;

  constructor(private dialog: MatDialog, private store: AppStateStore, private playlistService: PlaylistService) {
    this.store.state$.pipe(
      take(1),
      map(val => this.playlist = val.currentPlaylist)
    );
    this.value = new FormControl('');
  }

  ngOnInit() {
    this.value.valueChanges//source observable
      .pipe(
        debounceTime(1500),
        distinctUntilChanged(),
        tap(res => console.log('tapped' , res)),
        switchMap(val => {
          return this.openPopUp(val)
        })).subscribe(res => console.log('do something with http response ', res))
  }

  openPopUp(msg: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.playlist = new Playlist()//test
    this.playlist.name = 'awesome playlist';//test

    dialogConfig.data = {
      newPlaylist: true,
      title: 'Create new playlist',
      content: 'Add ' + msg + ' to ' + this.playlist.name
    };

    this.dialog.open(PopUpComponent, dialogConfig);

    return this.dialog.afterAllClosed
      .pipe(
        map( val =>
      {
        console.log('confirmed == ',val)

        this.playlistService.createNewPlaylist(msg)
      }))


  }

}
