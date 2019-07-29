import {PlaylistItem} from './../shared/playlist-item.model';
import {catchError, map, tap} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {Album, ApiResponse, Artist, Playlist} from "../models/spotifyData.model";
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

  setCurrentEntity(entity: Album | Artist): void {
    this.appStateStore.addCurrentEntity(entity);
  }


  setCurrentPlaylist(pl: Playlist): void {
    this.appStateStore.addCurrentPlaylist(pl);
  }

  addTrackToCurrentPlaylist(trackUri: string, playlistId: string): Observable<ApiResponse> | any {
    console.log(trackUri)
    console.log(playlistId)

    return this.http.get<Response>('api/spotify/add-track-playlist', {
      params: new HttpParams()
        .set('playlist_id', playlistId)
        .set('track_uri', trackUri)
    }).pipe(
      catchError(error => this.handleError(error)),
      map(res => res['payload'])
    );
  }

  createNewPlaylist(name: string) {
    console.log('calioooo')
    return this.http.get<Response>('api/spotify/new-playlist', {
      params: new HttpParams()
        .set('name', name)
    }).pipe(
      catchError(error => this.handleError(error)),
      map(res => res)
    );
  }


  handleError(error) {
    return throwError(error);
  }
}
