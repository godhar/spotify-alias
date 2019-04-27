import { SearchResult, Query } from './search.model';
import { SearchService } from './search.service';
import { Observable } from 'rxjs';
import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, NgModel } from '@angular/forms';
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
  artist: boolean = false;
  album: boolean = false;
  track: boolean = false;


  constructor(private searchService: SearchService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchInput: new FormControl(''),
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
        return this.searchService.search(new Query('bye bye baby', 'artist,album,track'))
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
