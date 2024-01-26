// src/app/home/home.component.ts
import {Component, OnInit} from '@angular/core';
import {EditorComponent} from "../editor/editor.component";
import {CommonModule} from "@angular/common";
import {Employee} from "../types";
import {EmployeesComponent} from "../employees/employees.component";
import {Router} from "@angular/router";
import {FilterComponent} from "../filter/filter.component";
import {EmployeeService} from "../service/employee.service";

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
export class ViewComponent implements OnInit {
  viewEmployeesOutput: Employee[] = [];

  constructor(
    private router: Router,
    private es: EmployeeService
  ) {
  }

  ngOnInit() {
    this.es.getEmployees().subscribe(employees => {
      this.viewEmployeesOutput = employees;
      console.log("Fetched in view component: ", employees);
    })
  }


}
