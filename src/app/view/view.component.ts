// src/app/home/home.component.ts
import {Component} from '@angular/core';
import {EditorComponent} from "../editor/editor.component";
import {CommonModule} from "@angular/common";
import {EmployeesComponent} from "../employees/employees.component";
import {FilterComponent} from "../filter/filter.component";

@Component({
  selector: 'app-home',
  templateUrl: './view.component.html',
  standalone: true,
  imports: [
    CommonModule,
    EditorComponent,
    EmployeesComponent,
    FilterComponent
  ],
  styleUrls: ['./view.component.css']
})
export class ViewComponent {

}
