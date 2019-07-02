import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuthenticated = false;

  constructor(private http: HttpClient) { }

  // isAuthenticated(): boolean {
  //   return this._isAuthenticated;
  // }

  isSessionAlive(): Observable<any> {
    
    return Observable.create((observer) => {

      this.http.get('api/current_user')
        .subscribe((res) => {
          this._isAuthenticated = true;
          observer.next(res); //server response
        }, (err) => {
          this._isAuthenticated = false;
          observer.next(false);
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
