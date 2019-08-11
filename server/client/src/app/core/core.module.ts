import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoaderService} from "../shared/loader/loader.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoaderInterceptor} from "./interceptors/loader.interceptor";
import {AuthService} from "./auth/auth.service";
import {AuthGuard} from "./auth/auth.guard";
import {AppStateStore} from "../store/app-state.store";
import {PlaylistService} from "./services/playlist.service";
import {NotFoundResolver} from "../shared/not-found/not-found.resolver";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class CoreModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        PlaylistService,
        LoaderService,
        NotFoundResolver,
        AuthService,
        AuthGuard,
        AppStateStore,
        { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }]
    };
  }
}
