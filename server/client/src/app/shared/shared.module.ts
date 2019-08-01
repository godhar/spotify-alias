import {ModuleWithProviders, NgModule} from '@angular/core';
import {PlaylistService} from "./services/playlist.service";
import {PopUpComponent} from "./pop-up/pop-up.component";
import {PlayListComponent} from "../playlist-view/play-list/play-list.component";
import {HttpClientModule} from "@angular/common/http";
import {FlexLayoutModule} from "@angular/flex-layout";
import {
  MatButtonModule,
  MatCardModule, MatDialogModule,
  MatIconModule, MatInputModule, MatListModule, MatNavList,
  MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule,
  MatToolbarModule,
  MatTooltipModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ShowIfAuthDirective} from "./show-If-auth.directive";
import {LoaderComponent} from "./loader/loader.component";
import {HeaderComponent} from "./header/header.component";
import {LoaderService} from "./loader/loader.service";
import {NotFoundComponent} from "../not-found/not-found.component";
import {RouterModule} from "@angular/router";

const uiModules = [
  CommonModule,
  HttpClientModule,
  MatSortModule,
  FlexLayoutModule,
  MatTooltipModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatTableModule,
  MatInputModule,
  MatPaginatorModule,
  MatListModule,
  RouterModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  ReactiveFormsModule,
  FormsModule];

@NgModule({
  declarations: [
    PlayListComponent,
    LoaderComponent,
    ShowIfAuthDirective,
    HeaderComponent,
    PopUpComponent,
    NotFoundComponent
  ],
  entryComponents: [PopUpComponent],
  imports: [uiModules],
  exports: [
    ShowIfAuthDirective,
    uiModules,
    PlayListComponent,
    LoaderComponent,
    PopUpComponent,
    HeaderComponent,
    NotFoundComponent
  ]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    const shareModule = this;
    return {
      ngModule: shareModule,
      providers: [PlaylistService, LoaderService]
    };
  }
}
