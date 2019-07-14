import {Component, OnInit} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public authState: string;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isSessionAlive().subscribe((res) => {
      console.log('response ', res)
      this.authState = res ? 'Logout' : 'Login';
      if(res['spotifyId']) {
        this.router.navigate(['playlists'])
      }
    }, error => {
      console.error(error);
    });
  }

  handleAuth(): void {
    if (this.authState === 'Logout') {
      this.authService.logOut();
      this.authState = 'Login';
    }
  }


}
