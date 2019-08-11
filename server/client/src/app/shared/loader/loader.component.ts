import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {LoaderService} from "./loader.service";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

  value = 50;
  loading$: Subject<boolean> = this.loaderService.isLoading$;

  constructor(private loaderService: LoaderService) {

    this.loaderService.isLoading$.subscribe(
      res => console.log('loading component async = ', res)
    )
  }
}
