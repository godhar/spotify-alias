import {SearchService} from './search.service';
import {EMPTY, Observable, of, throwError} from 'rxjs';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {
  debounceTime,
  switchMap,
  tap,
  startWith,
  distinctUntilChanged,
  filter
} from 'rxjs/operators';
import {Router} from "@angular/router";
import {Album, Artist, Track, TrackFull} from "../models/spotifyData.model";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  filteredSearchItems: Observable<Artist[] | Album[] | Track[]>;
  isLoading = false;
  searchForm: FormGroup;
  artist: FormControl;
  track: FormControl;
  album: FormControl;
  searchCategory: string;
  resultCategory: string;
  cardItem: Track | Artist | Album = null;
  allTracks$: Observable<TrackFull[]>;
  tracksToDisplay: boolean = false;

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
        filter(val => val && val !== ''),
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => this.isLoading = true),
        switchMap(value => {
          return this.searchService.searchByType(value.toString(), this.searchCategory)//TESTING
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


  getSelectedResult(selected) {
    console.log('not being triggered ??? ', selected.option.value)
    const val = selected.option.value;
    this.searchForm.get('searchInput').setValue('', {emit:false});
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
    this.searchForm.get('searchInput').setValue(null, {emitEvent: false});

    if (val.type !== 'track') {
      return this.searchService.getTracks(val.id, val.type)
        .subscribe(
          res => this.allTracks$ = res
        )
    }
  }

}
