import {Component, Input} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {EmployeeResponseDTO} from "../types";

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
  @Input() employee!: EmployeeResponseDTO;
}
