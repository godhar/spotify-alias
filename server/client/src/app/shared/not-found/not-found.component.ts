import { Component, OnInit } from '@angular/core';
import {SafeUrl} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  backgroundImage: SafeUrl;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.backgroundImage = this.route.snapshot.data['data'];
  }

}
