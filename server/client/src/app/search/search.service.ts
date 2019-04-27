import { Query, SearchResult } from './search.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, debounceTime, switchMap, tap, startWith, distinctUntilChanged, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  search(searchValue: Query): Observable<SearchResult[]> {

    return this.http.get<SearchResult[]>('api/spotify/search-all-data', {
      params: new HttpParams()
        .set('q', searchValue.query)
        .set('type', searchValue.type)
    })
      .pipe(
      map(res => res["payload"] )
      );

  }
}
