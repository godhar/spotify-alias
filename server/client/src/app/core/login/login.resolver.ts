import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import { map } from 'rxjs/operators';

@Injectable()
export class LoginResolver implements Resolve<any> {

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  resolve = (): Observable<any> =>
    this.http.get('assets/img/background-img/background-img.png', { responseType: 'blob' }).pipe(
      map( image => {
        const blob: Blob = new Blob([image], { type: 'image/jpeg' });
        const imageStyle = `${window.URL.createObjectURL(blob)}`;
        return this.sanitizer.bypassSecurityTrustUrl(imageStyle)
      })
    )
}
