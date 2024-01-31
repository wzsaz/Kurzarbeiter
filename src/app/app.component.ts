import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CommonModule} from "@angular/common";
import {NavbarComponent} from "./navbar/navbar.component";
import {KeycloakAngularModule} from "keycloak-angular";
import {EditorComponent} from "./editor/editor.component";
import {ReactiveFormsModule} from "@angular/forms";
import {Subscription} from "rxjs";
import {
  NgcCookieConsentService,
  NgcInitializationErrorEvent,
  NgcInitializingEvent,
  NgcNoCookieLawEvent,
  NgcStatusChangeEvent
} from "ngx-cookieconsent";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    ReactiveFormsModule,
    EditorComponent,
    KeycloakAngularModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private ccService: NgcCookieConsentService) {
  }
}
