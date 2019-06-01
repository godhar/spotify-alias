import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpotifyDataService {

  constructor(private http: HttpClient) { }

  fetchAllPlaylists(): Observable<any> {
    return this.http.get('api/spotify/playlists');
  }
}
