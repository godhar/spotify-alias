// import { User } from './../Models/user.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, ReplaySubject } from 'rxjs';
import { tap, delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuthenticated = false;

  constructor(private http: HttpClient) { }

  isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  isSessionAlive(): Observable<any> {
    
    return Observable.create((observer) => {

      this.http.get('api/current_user')
        .subscribe((res) => {
          this._isAuthenticated = true;
          observer.next(res); // your server response
        }, (err) => {
          this._isAuthenticated = false;
          observer.next(false);
          // observer.error(err); // won't work here you need to use next
        });
    });
  }

  logOut(): void {
    this.http.get('api/logout')
    .subscribe((currentUser) => {
      if(!currentUser) {
        this._isAuthenticated = false;
      }
    });
  }

}