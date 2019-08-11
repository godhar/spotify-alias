import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  public _isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
  }

  isAuth() {
    return this._isAuthenticated.asObservable();
  }

  isSessionAlive(): Observable<any> {

    return Observable.create((observer) => {

      this.http.get('api/current_user')
        .subscribe((res) => {
          console.log(res)
          if (res) {
            this._isAuthenticated.next(true);
          }
          observer.next(res); //server response
        }, () => {
          this._isAuthenticated.next(false);
          observer.next(false);
        });
    });
  }

  logOut(): void {
    this.http.get('api/logout')
      .subscribe((currentUser) => {
        if (!currentUser) {
          this._isAuthenticated.next(false);
        }
      });
  }

  ngOnDestroy(): void {
  }

}
