import {NgModule} from '@angular/core';
import {PopUpComponent} from "./pop-up/pop-up.component";
import {PlayListComponent} from "../playlist-view/play-list/play-list.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {
  MatButtonModule,
  MatCardModule, MatDialogModule,
  MatIconModule, MatInputModule, MatListModule,
  MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule,
  MatToolbarModule,
  MatTooltipModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {LoaderComponent} from "./loader/loader.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {RouterModule} from "@angular/router";

const uiModules = [
  CommonModule,
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
    PopUpComponent,
    NotFoundComponent
  ],
  entryComponents: [PopUpComponent],
  imports: [uiModules],
  exports: [
    uiModules,
    PlayListComponent,
    LoaderComponent,
    PopUpComponent,
    NotFoundComponent
  ]
})
export class SharedModule {
}
