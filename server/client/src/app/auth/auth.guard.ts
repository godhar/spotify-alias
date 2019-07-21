import {AuthService} from './auth.service';
import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(): Observable<boolean> {

    return this.authService.isSessionAlive()
      .pipe(
        map(res => {
          if (res) {
            return true;
          }
          this.router.navigate(['login']);
          return false;
        })
      );
  }
}
