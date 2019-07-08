import { SearchResult } from './../models/search.model';
import { SearchService } from './search.service';
import { Observable } from 'rxjs';
import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl, NgModel, Validators } from '@angular/forms';
import { map, debounceTime, switchMap, tap, startWith, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnChanges {

  filteredSearchItems: Observable<SearchResult[]>;
  isLoading = false;
  searchForm: FormGroup;
  artist: boolean;
  album: boolean;
  track: boolean;



  constructor(private searchService: SearchService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchInput: new FormControl(null)
    });
  }


  ngOnInit() {
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
    console.log(this.searchForm.get('searchInput').value)
  
  }

  displayFn(item: SearchResult) {
    return item ? `${item.name} | ${item.type} ${item.totalTracks || ""}` : null;
  }

}
