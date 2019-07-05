import { SearchService } from './search/search.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
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
  MatCheckboxModule
} from '@angular/material';
// import { NgMatAutocompleteModule } from '../../node_modules/@vguleaev/angular-material-autocomplete';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { PlayListsComponent } from './playlist/play-lists/play-lists.component';
import { PlayListComponent } from './playlist/play-list/play-list.component';
import { SearchComponent } from './search/search.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PlaylistEditComponent } from './playlist/playlist-edit/playlist-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingComponent,
    PlayListsComponent,
    PlayListComponent,
    SearchComponent,
    PlaylistEditComponent
  ],
  entryComponents: [PlayListComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatListModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    // NgMatAutocompleteModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    FormsModule
  ],
  providers: [AuthGuard, AuthService, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
