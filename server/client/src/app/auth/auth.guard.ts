import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {

    let authenticated = this.authService.isLoggedIn();
    let subject = new ReplaySubject<boolean>();

    authenticated.subscribe(

      (res) => {
        console.log("onNext guard: " + res);
        if (!res && state.url !== '/login') {
          console.log("redirecting to signin")
          this.router.navigate(['/login']);
        }
        subject.next(res);
      });

    return subject.asObservable();
  }


}
