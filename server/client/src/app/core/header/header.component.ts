import {Component} from '@angular/core';
import {MatIconRegistry} from "@angular/material";
import {DomSanitizer} from "@angular/platform-browser";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer,
              private router: Router,
              private authService: AuthService
  ) {
    iconRegistry.addSvgIcon(
      'baseline-list',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/baseline-list-24px.svg'));
    iconRegistry.addSvgIcon(
      'phi',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/phi.svg'));
  }

  logOutOfApp() {
    this.authService.logOut();
    this.router.navigate(['login']);
  }
}
