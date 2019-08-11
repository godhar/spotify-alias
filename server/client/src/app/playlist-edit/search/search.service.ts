import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {Album, Artist, Track} from "../../models/spotifyData.model";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {}

  searchByType(searchValue: string, type: string): Observable<Album[] | Artist[] | Track[]> {
    return this.http.get<Album[] | Artist[] | Track[]>('api/spotify/search-all-data', {
      params: new HttpParams()
        .set('q', searchValue)
        .set('type', type)
    })
      .pipe(
        catchError(err => throwError(err)),
        map(res => res["payload"])
      );
  }
}
