import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {finalize} from "rxjs/operators";
import {LoaderService} from "../shared/loader/loader.service";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  private reqUrlsToDitch = ['https://iplist.cc/api/','api/spotify/tracks', 'api/spotify/search-all-data', 'api/current_user', 'assets/img/icons/baseline-arrow_back_ios-24px.svg'];

  constructor(public loaderService: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.reqUrlsToDitch.includes(req.url)) {
      return next.handle(req);
    }
    this.loaderService.show();
    return next.handle(req).pipe(
      finalize(() => this.loaderService.hide())
    );
  }
}
