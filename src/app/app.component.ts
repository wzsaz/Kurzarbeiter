import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ViewComponent} from "./view/view.component";
import {CommonModule} from "@angular/common";
import {NavbarComponent} from "./navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    ViewComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Kurzarbeiter';
}
