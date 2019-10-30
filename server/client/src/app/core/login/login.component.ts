import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import {SafeUrl} from "@angular/platform-browser";
import {AppStateStore} from "../store/app-state.store";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  backgroundImage: SafeUrl;
  auth: AuthService;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private appStore: AppStateStore) {

    this.auth = this.authService;
    this.authService.isSessionAlive()
      .pipe(untilComponentDestroyed(this))
      .subscribe((res) => {
        if (res && res['spotifyId']) {
          this.appStore.addCurrentUser(res['spotifyId']);
          this.appStore.addCurrentRoute('login');
          this.authService._isAuthenticated.next(true);
          this.router.navigate(['playlists'])
        }
      }, error => {
        console.error(error);
      });
  }

  ngOnInit() {
    this.backgroundImage = this.route.snapshot.data['data'];
  }

  ngOnDestroy(): void {
  }

}
