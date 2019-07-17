import {PlayListAlbum, PlayListArtist, PlaylistItem} from './../shared/playlist-item.model';
import {map, tap} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Album, Artist} from "../models/spotifyData.model";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  private currentEntity: { currentEntity: Album | Artist, currentPlayListId: string };

  constructor(private http: HttpClient) {
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
      tap(val => console.log('numbered??', val)),
      map(res => res['payload'].map(data => new PlaylistItem().deserialize(data)))
    );
  }

  setCurrentEntity(detail: { currentEntity: Album | Artist, currentPlayListId: string }) {
    this.currentEntity = detail;
  }

  getCurrentEntity() {
    return Object.assign({}, this.currentEntity);
  }

}
