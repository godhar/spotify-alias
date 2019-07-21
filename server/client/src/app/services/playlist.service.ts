import {PlayListAlbum, PlayListArtist, PlaylistItem} from './../shared/playlist-item.model';
import {map, tap} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Album, Artist, Playlist} from "../models/spotifyData.model";
import {AppStateStore} from "../store/app-state.store";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private http: HttpClient, private appStateStore: AppStateStore) {}

  findPlaylistTracks(
    playlistId: string, filter = '', sortOrder = 'asc',
    pageNumber, pageSize): Observable<PlaylistItem[]> {
    return this.http.get<PlaylistItem[]>('api/spotify/playlist-item', {
      params: new HttpParams()
        .set('playlistId', playlistId.toString())
        .set('filter', filter)
        .set('sortOrder', sortOrder)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    }).pipe(
      tap(val => console.log('numbered??', val)),
      map(res => res['payload'].map(data => new PlaylistItem().deserialize(data)))
    );
  }

  setCurrentEntity(entity: Album|Artist): void {
    this.appStateStore.addCurrentEntity(entity);
  }


  setCurrentPlaylist(pl: Playlist): void {
    this.appStateStore.addCurrentPlaylist(pl);
  }

}
