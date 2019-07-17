import {SearchService} from './search.service';
import {Observable, Subject} from 'rxjs';
import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {
  debounceTime,
  switchMap,
  tap,
  startWith,
  distinctUntilChanged,
  filter, takeUntil
} from 'rxjs/operators';
import {Router} from "@angular/router";
import {Album, Artist, Track} from "../models/spotifyData.model";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {


  @Output() entitySelected = new EventEmitter<Album | Artist | Track>();


  filteredSearchItems: Observable<Artist[] | Album[] | Track[]>;
  destroy$ = new Subject();
  isLoading = false;
  searchForm: FormGroup;
  artist: FormControl;
  track: FormControl;
  album: FormControl;
  searchCategory: string;

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
        takeUntil(this.destroy$),
        startWith(null),
        filter(val => val && val !== ''),
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => this.isLoading = true),
        switchMap(value => {
          console.log(value)
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
    let val = selected.option.value;
    this.searchForm.get('searchInput').setValue('', {emit: false});
    if (val.type == 'album') {
      val = new Album().deserialize(val);
    }
    if (val.type == 'track') {
      val = new Track().deserialize(val);
    }
    if (val.type == 'artist') {
      val = new Artist().deserialize(val);
    }
    this.searchForm.get('searchInput').setValue(null, {emitEvent: false});

    this.entitySelected.emit(<Album | Artist | Track>val);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }

}
