import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Employee} from "../types";
import {MatInputModule} from "@angular/material/input";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatListModule} from "@angular/material/list";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {Observable, startWith} from "rxjs";
import {map} from "rxjs/operators";
import {NgForOf} from "@angular/common";
import {EmployeeService} from "../service/employee.service";

@Component({
  selector: 'app-employee-search',
  standalone: true,
  imports: [
    MatInputModule,
    FormsModule,
    MatListModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './employee-search.component.html',
  styleUrl: './employee-search.component.css'
})
export class EmployeeSearchComponent implements OnInit {
  firstNameControl = new FormControl();
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  filteredOptions: string[] = [];

  constructor(protected es : EmployeeService) {
  }

  ngOnInit() {
    this.loadEmployees();

    this.firstNameControl.valueChanges
      .pipe(
        startWith(''),
        map(value => {
          const filterValue = value.toLowerCase();
          return this.employees.filter(emp =>
            emp.firstName.toLowerCase().includes(filterValue)
          );
        })
      )
      .subscribe(filteredEmployees => {
        this.filteredEmployees = filteredEmployees;
        this.filteredOptions = filteredEmployees.map(emp => emp.firstName);
      });
  }

  private loadEmployees(): void {
    this.es.getEmployees().subscribe(employees => {
      this.employees = employees;
    });
  }
}
