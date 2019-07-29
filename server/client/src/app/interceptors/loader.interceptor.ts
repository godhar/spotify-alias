import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {finalize} from "rxjs/operators";
import {LoaderService} from "../playlist/playlist-add/loader.service";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  private reqUrlsToDitch = ['http://ip-api.com/json','api/spotify/tracks', 'api/spotify/search-all-data', 'api/current_user', 'assets/img/icons/baseline-arrow_back_ios-24px.svg'];

  constructor(public loaderService: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log('request URL ==== ', req.url)
    if (this.reqUrlsToDitch.includes(req.url)) {
      console.log('does nothing ==== ', req);
      return next.handle(req); // do nothing
    }
    this.loaderService.show();
    return next.handle(req).pipe(
      finalize(() => this.loaderService.hide())
    );
  }
}
