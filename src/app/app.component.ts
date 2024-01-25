import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ViewComponent} from "./view/view.component";
import {CommonModule} from "@angular/common";
import {NavbarComponent} from "./navbar/navbar.component";
import {KeycloakAngularModule} from "keycloak-angular";
import {EditorComponent} from "./editor/editor.component";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    ViewComponent,
    ReactiveFormsModule,
    EditorComponent,
    KeycloakAngularModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Kurzarbeiter';
}
