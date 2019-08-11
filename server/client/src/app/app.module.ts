import { AuthGuard } from './core/auth/auth.guard';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/login/login.component';
import { AppStateStore } from "./store/app-state.store";
import { LoaderInterceptor } from "./interceptors/loader.interceptor";
import { SharedModule } from "./shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
    ],
  imports: [
    AppRoutingModule,
    SharedModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    AuthGuard,
    AppStateStore,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
