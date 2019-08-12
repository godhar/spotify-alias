import {AuthService} from './auth.service';
import {Injectable} from '@angular/core';
import {CanLoad, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanLoad {

  constructor(private authService: AuthService, private router: Router) {
  }

  canLoad(): Observable<boolean> {
    return this.authService.isAuth()
      .pipe(
        take(1),
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
