import {Component} from '@angular/core';
import {GeneratorComponent} from "../generator/generator.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    GeneratorComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
}
