import { SearchService } from './search.service';
import { Observable } from 'rxjs';
import { Component, OnInit, OnChanges } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, FormArray, Form} from '@angular/forms';
import { debounceTime, switchMap, tap, startWith, distinctUntilChanged } from 'rxjs/operators';
import {SearchResult} from "../models/search.model";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnChanges {

  filteredSearchItems: Observable<SearchResult[]>;
  isLoading = false;
  searchForm: FormGroup;
  artist: FormControl;
  track: FormControl;
  album: FormControl;

  constructor(private searchService: SearchService, private fb: FormBuilder) {

    this.searchForm = fb.group({
      artist : new FormControl({value: false, disabled: false}),
      track: new FormControl({value: false, disabled: false}),
      album : new FormControl({value: false, disabled: false}),
      searchInput: new FormControl({value: null, disabled: true})
    });
  }


  ngOnInit() {
    this.searchForm.valueChanges.subscribe(

      res => this.validateCheckboxes(res)
    );

      this.filteredSearchItems = this.searchForm.get('searchInput').valueChanges
        .pipe(
          startWith(null),
          debounceTime(200),
          distinctUntilChanged(),
          tap(() => this.isLoading = true),
          switchMap(value => {
            console.log('switch map value === ', value);
            return this.searchService.searchByType('bye bye baby', 'artist')//TESTING
          })
        );
  }


  ngOnChanges(): void {
    // console.log('NG CHANGES === ',this.formArray)
  }


  validateCheckboxes(controls): void {
    if( controls.artist || controls.album || controls.track ) {
      this.searchForm.get('searchInput').enable({emitEvent: false});
    } else {
      this.searchForm.get('searchInput').disable({emitEvent: false});
    }
  }


  displayFn(item: SearchResult) {
    return item ? `${item.name} | ${item.type} ${item.totalTracks || ""}` : null;
  }

}
