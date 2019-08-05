import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import {SafeUrl} from "@angular/platform-browser";
import {Observable} from "rxjs";
import {AppStateStore} from "../../store/app-state.store";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  backgroundImage: SafeUrl;
  authState: boolean;
  isAuth$: Observable<boolean>;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private appStore: AppStateStore) {
    this.isAuth$ = this.authService.isAuth();

    this.authService.isSessionAlive()
      .pipe(untilComponentDestroyed(this))
      .subscribe((res) => {
        this.authState = res;

        if (res && res['spotifyId']) {
          this.appStore.addCurrentUser(res['spotifyId']);
          this.router.navigate(['playlists'])
        }
      }, error => {
        console.error(error);
      });
  }

  logUserOut(): void {
    this.authService.logOut();
    this.authState = false;
  }

  ngOnInit() {
    this.backgroundImage = this.route.snapshot.data['data'];
  }

  ngOnDestroy(): void {}

}
