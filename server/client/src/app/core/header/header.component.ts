import {Component, OnInit} from '@angular/core';
import {MatIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  constructor(iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer,
              private authService: AuthService
  ) {
    iconRegistry.addSvgIcon(
      'baseline-list',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/baseline-list-24px.svg'));
  }

  ngOnInit() {
  }

  logOutOfApp() {
    this.authService.logOut();
  }

}
