import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {finalize} from "rxjs/operators";
import {LoaderService} from "../../shared/loader/loader.service";

@Injectable({ providedIn: 'root' })
export class LoaderInterceptor implements HttpInterceptor {

  private reqUrlsToDitch = ['api/spotify/search-all-data','assets/img/icons/phi.svg','assets/img/icons/baseline-arrow_back_ios-24px.svg', 'api/current_user', 'assets/img/icons/baseline-list-24px.svg'];
//TODO test the removal of 'api/spotify/tracks' - see if loader shows   assets/img/icons/baseline-arrow_back_ios-24px.svg
  constructor(public loaderService: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('request url == ', req.url)
    if (this.reqUrlsToDitch.includes(req.url)) {
      console.log('skipping....', req.url);
      return next.handle(req);
    }
    console.log('right after skipping....', req.url);
    this.loaderService.show();
    return next.handle(req).pipe(
      finalize(() => this.loaderService.hide())
    );
  }
}
