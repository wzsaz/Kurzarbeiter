import {Component, inject} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {AsyncPipe} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    KeycloakAngularModule
  ]
})
export class NavbarComponent {
  private breakpointObserver = inject(BreakpointObserver);

  constructor(private snackBar: MatSnackBar, private keycloakService: KeycloakService, private router: Router) {
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  logout(): void {
    // console.log(this.keycloakService.login());
    // this.keycloakService.login({}).then(r => console.log(r));
    this.router.navigate(['/home']).then(r => {
        this.snackBar.open('Logged out successfully', 'OK', {duration: 3000});
      }
    )
  }
}
