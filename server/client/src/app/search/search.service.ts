import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {EMPTY, Observable, of, throwError} from 'rxjs';
import {Album, Artist, Track, TrackFull} from "../models/spotifyData.model";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  userIso: string;

  constructor(private http: HttpClient) {
    this.http.get('http://ip-api.com/json')
      .subscribe(res => this.userIso = res['countryCode']);
  }

  searchByType(searchValue: string, type: string): Observable<Album[] | Artist[] | Track[]> {
    return this.http.get<Album[] | Artist[] | Track[]>('api/spotify/search-all-data', {
      params: new HttpParams()
        .set('q', searchValue)
        .set('type', type)
    })
      .pipe(
        tap((res) => console.log(res)),
        map(res => res["payload"])
      );
  }


  getTracks(id: string, type: string): Observable<TrackFull[]> | Observable<any> {
    console.log('get tracks called????',id)
    console.log('get tracks called????',type)
    return this.http.get<TrackFull[]>('api/spotify/tracks', {
      params: new HttpParams()
        .set('id', id)
        .set('type', type)
        .set('iso', this.userIso)
    })
      .pipe(
        catchError( err =>  throwError(err)),
        tap((res) => console.log(res)),
        map(res => res)
        );
  }
}
