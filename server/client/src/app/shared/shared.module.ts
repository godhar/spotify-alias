import {NgModule} from '@angular/core';
import {PopUpComponent} from "./pop-up/pop-up.component";
import {PlayListComponent} from "../playlist-view/play-list/play-list.component";
import {
   MatDialogModule,
  MatInputModule,
  MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule,
  MatTooltipModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {LoaderComponent} from "./loader/loader.component";
import {RouterModule} from "@angular/router";
import {MainSharedModule} from "../main/main-shared.module";

const uiModules = [
  CommonModule,
  MatDialogModule,
  MatTooltipModule,
  MatSortModule,
  MatTableModule,
  MatInputModule,
  MatPaginatorModule,
  RouterModule,
  MatProgressSpinnerModule,
  ReactiveFormsModule,
  FormsModule];


@NgModule({
  declarations: [
    PlayListComponent,
    LoaderComponent,
    PopUpComponent,
  ],
  entryComponents: [PopUpComponent],
  imports: [
    uiModules,
    MainSharedModule
  ],
  exports: [
    uiModules,
    MainSharedModule,
    PlayListComponent,
    LoaderComponent,
    PopUpComponent
  ]
})
export class SharedModule {
}
