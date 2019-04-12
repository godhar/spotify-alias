import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError, Observer } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { of } from "rxjs/index";


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> {

    return this.authService.isSessionAlive()
      .pipe(
      map(res => {

        if (res) {
          return true;

        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
      );
  }
}
