import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap, delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticatedUser;

  constructor(private http: HttpClient) { }

  isLoggedIn() {
    let subject = new BehaviorSubject<boolean>(null);


    if (this.authenticatedUser) {
      subject.next(true);

    } else {

      this.http.get('/api/current_user')
        .subscribe(res => {

          console.log("next: returning true");

          this.authenticatedUser = res;
          subject.next(true);

        }, (res) => {
          console.log("next: returning false");
          subject.next(false);
        });
    }
    return subject.asObservable()
  }


}
