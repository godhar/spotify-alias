import { PlaylistItem } from './../shared/playlist-item.model';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private http: HttpClient) { }

  findPlaylistTracks(
        playlistId: string, filter = '', sortOrder = 'asc',
        pageNumber = 0, pageSize = 3):  Observable<PlaylistItem[]> {

        return this.http.get('api/spotify/playlist-item', {
            params: new HttpParams()
                .set('playlistId', playlistId.toString())
                .set('filter', filter)
                .set('sortOrder', sortOrder)
                .set('pageNumber', pageNumber.toString())
                .set('pageSize', pageSize.toString())
        }).pipe(
            map(res => res["payload"])
        );
    }
}
