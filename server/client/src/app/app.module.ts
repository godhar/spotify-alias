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
  MatCheckboxModule, MatTooltipModule
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
    PlaylistAddComponent
  ],
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
    MatSortModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    FormsModule
  ],
  providers: [AuthGuard, AuthService, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
