import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SpotifyDataService {

  constructor(private http: HttpClient) {
  }

  fetchAllPlaylists(): Observable<any> {
    return this.http.get('api/spotify/playlists');
  }

  removeItemFromPlaylist(trackUri: string, snapshotId: string, playlistId: string, trackNumber: number): Observable<Object> {
    return this.http.get('api/spotify/delete-playlist-track', {
      params: new HttpParams()
        .set('track_uri', trackUri)
        .set('snapshot_id', snapshotId)
        .set('playlist_id', playlistId)
        .set('track_number', trackNumber.toString())
    }).pipe(
      map(res => res['payload'])
    )
  }


}
