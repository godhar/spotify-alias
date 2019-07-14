import { Injectable } from '@angular/core';
import {Observable, throwError} from "rxjs";
import {TrackFull} from "../../../models/spotifyData.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FullTrackService {

  userIso: string;

  constructor(private http: HttpClient) {
    this.http.get('http://ip-api.com/json')
      .subscribe(res => this.userIso = res['countryCode']);
  }


  getTracks(id: string, type: string): Observable<TrackFull[]> | Observable<any> {
    console.log('get tracks called????',id)
    console.log('get tracks called????',type)

    return this.http.get('api/spotify/tracks', {
      params: new HttpParams()
        .set('id', id)
        .set('type', type)
        .set('iso', this.userIso)
    })
      .pipe(
        catchError( err =>  throwError(err)),
        tap((res) => console.log(res)),
        map(res => res['payload']['data'].map((tr) => new TrackFull().deserialize(tr)))
      );
  }
}
