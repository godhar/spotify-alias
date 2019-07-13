import {SearchService} from './search.service';
import {EMPTY, Observable} from 'rxjs';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {debounceTime, switchMap, tap, startWith, distinctUntilChanged} from 'rxjs/operators';
import {Router} from "@angular/router";
import {Album, Artist, Track} from "../models/spotifyData.model";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  filteredSearchItems: Observable<Artist[]|Album[]|Track[]>;
  isLoading = false;
  searchForm: FormGroup;
  artist: FormControl;
  track: FormControl;
  album: FormControl;
  searchCategory: string;
  resultCategory: string;
  cardItem: Track | Artist | Album = null;

  constructor(private router: Router, private searchService: SearchService, private fb: FormBuilder) {
    this.searchForm = fb.group({
      artist: new FormControl({value: false, disabled: false}),
      track: new FormControl({value: false, disabled: false}),
      album: new FormControl({value: false, disabled: false}),
      searchInput: new FormControl({value: null, disabled: true})
    });
  }


  ngOnInit() {
    this.searchForm.valueChanges.subscribe(
      res => this.handleForm(res)
    );

    this.filteredSearchItems = this.searchForm.get('searchInput').valueChanges
      .pipe(
        startWith(null),
        debounceTime(200),
        distinctUntilChanged(),
        tap((val) => {
          this.isLoading = true;
          if (!val) {
            return EMPTY
          }
        }),
        switchMap(value => {
          return this.searchService.searchByType(value, this.searchCategory)//TESTING
        })
      );
  }


  handleForm(controls): void {
    if (controls.artist || controls.album || controls.track) {
      this.searchForm.get('searchInput').enable({emitEvent: false});
    } else {
      this.searchForm.get('searchInput').disable({emitEvent: false});
    }
    this.setSearchCategory(controls);
  }


  setSearchCategory(values): void {
    this.searchCategory = Object.keys(values).find(key => values[key] === true);
  }


  // displayFn(item: SearchResult) {
  //   return item ? `${item.name} | ${item.type} ${item.total_tracks || "0"} tracks` : null;
  // }


  getSelectedResult(selected) {
    console.log('not being triggered ??? ', selected.option.value)
    const val = selected.option.value;

    if (val.type == 'album') {
      this.cardItem = new Album().deserialize(val);
    }
    if (val.type == 'track') {
      this.cardItem = new Track().deserialize(val);
    }
    if (val.type == 'artist') {
      this.cardItem = new Artist().deserialize(val);
    }

    this.resultCategory = val.type;
    this.searchForm.get('searchInput').setValue('', {emitEvent: false});

  }

}
