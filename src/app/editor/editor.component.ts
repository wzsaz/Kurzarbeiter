import { Component } from '@angular/core';
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent {

}
