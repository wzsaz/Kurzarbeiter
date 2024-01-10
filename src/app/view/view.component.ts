// src/app/view/view.component.ts
import { Component } from '@angular/core';
import {EditorComponent} from "../editor/editor.component";
import {TableComponent} from "../table/table.component";
import {CommonModule, NgIf} from "@angular/common";
import {EmployeeResponseDTO} from "../types";
import {DetailviewComponent} from "../detailview/detailview.component";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  standalone: true,
  imports: [
    CommonModule,
    EditorComponent,
    TableComponent,
    DetailviewComponent,
  ],
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  selectedEmployee: EmployeeResponseDTO | null = null;
  detailedEmployee: EmployeeResponseDTO | null = null;

  onEdit(employee: EmployeeResponseDTO): void {
    this.selectedEmployee = employee;
  }

  onDetails(employee: EmployeeResponseDTO): void {
    this.detailedEmployee = employee;
  }
}
