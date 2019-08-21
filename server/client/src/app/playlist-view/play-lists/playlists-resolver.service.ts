import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {Playlist} from "../../models/spotifyData.model";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PlayListsResolverService implements Resolve<Playlist[]> {

  constructor(private http: HttpClient, private router: Router) {}

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
            return this.handleError();
          }
        })
      );
  }


  handleError(): Observable<boolean[]> {
    this.router.navigate(['/not-found']);
    return of([false]);
  }
}

