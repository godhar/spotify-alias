import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  isLoading$ = new Subject<boolean>();

  show() {
    this.isLoading$.next(true);
    console.log('showing loader ---- %%%%%%%%%%%%%%%%% ', this.isLoading$);
  }

  hide() {
    console.log('terminate loader');
    this.isLoading$.next(false);
  }
}
