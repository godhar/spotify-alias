import {Injectable} from "@angular/core";
import {Resolve} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable()
export class NotFoundResolver implements Resolve<any> {

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  resolve = (): Observable<any> =>
    this.http.get('assets/img/background-img/not-found-img.png', { responseType: 'blob' }).pipe(
      map( image => {
        const blob: Blob = new Blob([image], { type: 'image/png' });
        const imageStyle = `${window.URL.createObjectURL(blob)}`;
        return this.sanitizer.bypassSecurityTrustUrl(imageStyle)
      })
    )
}
