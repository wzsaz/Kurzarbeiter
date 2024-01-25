// src/app/home/home.component.ts
import { Component } from '@angular/core';
import {EditorComponent} from "../editor/editor.component";
import {CommonModule} from "@angular/common";
import {Employee} from "../types";
import {EmployeesComponent} from "../employees/employees.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    CommonModule,
    EditorComponent,
    EmployeesComponent,
  ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  selectedEmployee: Employee | null = null;
  constructor(private router: Router) { }

  onEdit(employee: Employee): void {
    console.log('onEdit called for: ', employee);
    this.router.navigate(['/editor', employee.id]).then(() => console.log('navigated to editor'));
  }

}
