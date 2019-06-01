import { SearchResult } from '../models/search.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, debounceTime, switchMap, tap, startWith, distinctUntilChanged, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  searchAll(searchValue, type: string): Observable<SearchResult[]> {
    console.log('***searching ****', searchValue);


    return this.http.get<SearchResult[]>('api/spotify/search-all-data', {
      params: new HttpParams()
        .set('q', searchValue)
        .set('type', type)
    })
      .pipe(
      tap((res) => console.log(res)),
      map(res => res["payload"])
      );
  }

  // getTrackFromAblum(newTrackQuery): Observable<SearchResult[]> {
  //   console.log('get track from alub call...22...')
  //   return this.http.get<SearchResult[]>('api/spotify/getTracksByAlbum', {
  //     params: new HttpParams()
  //       .set('id', newTrackQuery.id)
  //       .set('type', 'album-tracks')
  //   })
  //     .pipe(
  //     tap((res) => console.log(res)),
  //     map(res => res["payload"])
  //     );
  // }
}
