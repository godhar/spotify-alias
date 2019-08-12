import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
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

  isSessionAlive() {
      return this.http.get('api/current_user')
  }

  logOut(): void {
    this.http.get('api/logout', {withCredentials: true})
      .subscribe((res) => {
        if (!res) {
          this._isAuthenticated.next(false);
        }
      });
  }

  ngOnDestroy(): void {
  }

}
