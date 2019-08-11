import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/login/login.component';
import { SharedModule } from "./shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CoreModule} from "./core/core.module";
import {HeaderComponent} from "./core/header/header.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent
    ],
  imports: [
    CoreModule.forRoot(),
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
