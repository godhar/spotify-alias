import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  public _isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
  }

  isAuth() {
    this._isAuthenticated.subscribe(res => console.log('emitting ', res))
    return this._isAuthenticated.asObservable();
  }

  isSessionAlive(): Observable<any> {

    return Observable.create((observer) => {

      this.http.get('api/current_user')
        .pipe(untilComponentDestroyed(this))
        .subscribe((res) => {
          this._isAuthenticated.next(true);
          observer.next(res); //server response
        }, () => {
          this._isAuthenticated.next(false);
          observer.next(false);
        });
    });
  }

  logOut(): void {
    this.http.get('api/logout')
      .pipe(untilComponentDestroyed(this))
      .subscribe((currentUser) => {
        if (!currentUser) {
          this._isAuthenticated.next(false);
        }
      });
  }

  ngOnDestroy(): void {}

}
