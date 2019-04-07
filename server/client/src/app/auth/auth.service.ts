import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  isLoggedIn(): Observable<any> {
    console.log('auth service called');
    return this.http.get(`${environment.apiUrl}` + '/api/current_user')
  }
}
