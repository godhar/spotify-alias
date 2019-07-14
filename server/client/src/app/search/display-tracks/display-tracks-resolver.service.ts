import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {EMPTY, Observable, of} from "rxjs";
import {Track, TrackFull} from "../../models/spotifyData.model";
import {catchError, mergeMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DisplayTracksResolverService implements Resolve<any> {

  constructor(private http: HttpClient) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TrackFull[]> | Observable<never> {
    const id = route.params.id;
    const category = route.params.type;
    const url = 'api/spotify/tracks';

    return this.http.get<TrackFull[]>(url, {
      params: new HttpParams()
        .set('id', id)
        .set('type', category)
    })
      .pipe(
        catchError(error => {
          console.error(error);
          return EMPTY
        }),
        mergeMap(
          res => {
            if (res['payload']) {
              return of(res['payload'])
            } else {
              return EMPTY;// same as: Observable.of([])
            }
          })
      )
  }
}

