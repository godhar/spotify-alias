import {catchError, map} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, Subject, throwError} from 'rxjs';
import {Album, ApiResponse, Artist, Playlist} from "../../models/spotifyData.model";
import {AppStateStore} from "../store/app-state.store";
import {PlaylistItem} from "../../models/playlist-item.model";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  public navCurrentPlaylist$ = new Subject<boolean>();

  constructor(private http: HttpClient, private appStateStore: AppStateStore) {
  }

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
    return this.http.get<Response>('api/spotify/new-playlist', {
      params: new HttpParams()
        .set('name', name)
    }).pipe(
      catchError(error => this.handleError(error)),
      map(res => res)
    );
  }

  newPlaylistName(name: string, plId: string) {
    return this.http.get<Response>('api/spotify/new-playlist-name', {
      params: new HttpParams()
        .set('name', name)
        .set('id', plId)
    }).pipe(
      catchError(error => this.handleError(error)),
      map(res => console.log(res))
    );
  }

  removeItemFromPlaylist(trackUri: string, snapshotId: string, playlistId: string, trackNumber: number): Observable<Object> {
    return this.http.get('api/spotify/delete-playlist-track', {
      params: new HttpParams()
        .set('track_uri', trackUri)
        .set('snapshot_id', snapshotId)
        .set('playlist_id', playlistId)
        .set('track_number', trackNumber.toString())
    }).pipe(
      catchError(err => throwError(err)),
      map(res => res['payload'])
    )
  }

  fireNavigationToPlaylist(){
    this.navCurrentPlaylist$.next(true);
  }

  passStream() {
    return this.navCurrentPlaylist$.asObservable();
  }

  handleError(error) {
    return throwError(error);
  }
}
