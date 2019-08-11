import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public isLoading$ = new BehaviorSubject<boolean>(false);

  show() {
    this.isLoading$.next(true);
    console.log('showing loader ---- %%%%%%%%%%%%%%%%% ', this.isLoading$);
  }

  hide() {
    console.log('terminate loader');
    this.isLoading$.next(false);
  }
}
