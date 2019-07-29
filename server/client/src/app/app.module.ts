import { SearchService } from './search/search.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatTableModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatAutocompleteModule,
  MatCheckboxModule, MatTooltipModule, MatProgressBarModule
} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { PlayListsComponent } from './playlist/play-lists/play-lists.component';
import { PlayListComponent } from './playlist/play-list/play-list.component';
import { SearchComponent } from './search/search.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PopUpComponent } from './pop-up/pop-up.component';
import {DisplayResultComponent} from "./search/display-result/display-result.component";
import {DisplayTracksComponent} from "./search/display-tracks/display-tracks.component";
import { PlaylistAddComponent } from './playlist/playlist-add/playlist-add.component';
import {AppStateStore} from "./store/app-state.store";
import { PlaylistNewComponent } from './playlist/playlist-new/playlist-new.component';
import {LoaderComponent} from "./shared/loader/loader.component";
import {LoaderService} from "./playlist/playlist-add/loader.service";
import {LoaderInterceptor} from "./interceptors/loader.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PlayListsComponent,
    PlayListComponent,
    SearchComponent,
    PopUpComponent,
    DisplayResultComponent,
    DisplayTracksComponent,
    PlaylistAddComponent,
    PlaylistNewComponent,
    LoaderComponent],
  entryComponents: [PopUpComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSortModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    FormsModule
    // SharedModule
  ],
  providers: [AuthGuard, AuthService, SearchService, AppStateStore, LoaderService, { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
