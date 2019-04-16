import { SpotifyDataService } from './../spotifyData/spotify-data.service';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent{

  public authState: string;

  constructor(private authService: AuthService,
    private router: Router) {
    this.authService.isSessionAlive().subscribe((res) => {
      this.authState = res ? 'Logout' : 'Login';
    });
  }

  handleAuth(): void {
    if (this.authState === 'Logout') {
      this.authService.logOut();
      this.router.navigate(['/login']);
      this.authState = 'Login';
    }
  }

}
