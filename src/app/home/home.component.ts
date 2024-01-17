// src/app/home/home.component.ts
import { Component } from '@angular/core';
import {EditorComponent} from "../editor/editor.component";
import {CommonModule, NgIf} from "@angular/common";
import {EmployeeResponseDTO} from "../types";
import {EmployeeviewComponent} from "../employeeview/employeeview.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    CommonModule,
    EditorComponent,
    EmployeeviewComponent,
  ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
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
