// src/app/view/view.component.ts
import { Component } from '@angular/core';
import {EditorComponent} from "../editor/editor.component";
import {TableComponent} from "../table/table.component";
import {CommonModule, NgIf} from "@angular/common";
import {EmployeeResponseDTO} from "../types";
import {DetailviewComponent} from "../detailview/detailview.component";
import {Router} from "@angular/router";

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

  constructor(private router: Router) { }

  onEdit(employee: EmployeeResponseDTO): void {
    console.log('onEdit called for: ', employee);
    this.router.navigate(['/editor', employee.id]).then(r => console.log('navigated to editor'));
  }

  onDetails(employee: EmployeeResponseDTO): void {
    console.log('onDetails called for: ', employee);
    this.detailedEmployee = employee;
  }
}
