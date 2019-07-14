import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {EMPTY, Observable, of, pipe} from "rxjs";
import {Playlist, Track, TrackFull} from "../../models/spotifyData.model";
import {catchError, mergeMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PlayListsResolverService implements Resolve<Playlist[]> {

  constructor(private http: HttpClient) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
    console.log('resolver called')
    return this.http.get('api/spotify/playlists')
      .pipe(
        catchError(error => {
          console.error(error);
          return EMPTY
        }),
        mergeMap(
          res => {
            res['payload'].map( (pl) => new Playlist().deserialize(pl))
            console.log('res is ', res)

            if (res['payload']) {
              return of(res['payload'])
            } else {
              return EMPTY;// same as: Observable.of([])
            }
          })
      )
  }
}

