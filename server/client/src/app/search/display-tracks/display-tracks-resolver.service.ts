import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {EMPTY, Observable, of, throwError} from "rxjs";
import {TrackFull} from "../../models/spotifyData.model";
import {catchError, mergeMap, switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DisplayTracksResolverService implements Resolve<any> {

  isoCode: string;

  constructor(private http: HttpClient) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TrackFull[]> | Observable<never> {
    const id = route.params.id;
    const category = route.params.type;
    return this.http.get('http://ip-api.com/json')
      .pipe(
        switchMap(isoCode => {
          return this.getTracks(id, category, isoCode)
        })
      )
  }


  getTracks(id:string, category:string, iso): Observable<TrackFull[]> | Observable<never> {
    const isoCode = iso['countryCode'];
    console.log('right order country code ', isoCode)
    const url = 'api/spotify/tracks';

    return this.http.get<TrackFull[]>(url, {
      params: new HttpParams()
        .set('id', id)
        .set('type', category)
        .set('iso', isoCode)
    })
      .pipe(
        catchError(error => throwError(error)),
        mergeMap(
          res => {
            if (res['payload']) {
              const mappedTracks = res['payload']['data'].map((tr) => new TrackFull().deserialize(tr));
              return of(mappedTracks)
            } else {
              return EMPTY;// same as: Observable.of([])
            }
          })
      )
  }
}

