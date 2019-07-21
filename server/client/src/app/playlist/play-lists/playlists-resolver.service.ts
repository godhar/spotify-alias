import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {EMPTY, Observable, of, pipe, throwError} from "rxjs";
import {Playlist, Track, TrackFull} from "../../models/spotifyData.model";
import {catchError, map, mergeMap, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PlayListsResolverService implements Resolve<Playlist[]> {

  constructor(private http: HttpClient) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Observable<never> {
    return this.http.get('api/spotify/playlists')
      .pipe(
        catchError(err => {
          console.error(err);
          return this.handleError();
        }),
        map(res => {
          if (res['payload']) {
            return res['payload'].map((pl) => {
              return new Playlist().deserialize(pl);
            });
          } else {
            return this.handleError();//navigate to error page
          }
        })
      );
  }


  handleError(): Observable<boolean[]> {
    return of([false]);//new
  }
}

