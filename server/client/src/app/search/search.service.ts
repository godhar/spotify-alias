import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map,tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Album, Artist, Track} from "../models/spotifyData.model";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {
  }

  searchByType(searchValue, type: string): Observable<Album[]|Artist[]|Track[]> {
    console.log('***searching ****', searchValue);

    return this.http.get<Album[]|Artist[]|Track[]>('api/spotify/search-all-data', {
      params: new HttpParams()
        .set('q', searchValue)
        .set('type', type)
    })
      .pipe(
        tap((res) => console.log(res)),
        map(res => res["payload"])
      );
  }
}
