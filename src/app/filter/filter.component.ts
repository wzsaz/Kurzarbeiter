import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {NgIf} from "@angular/common";
import {Employee} from "../types";
import {EmployeesComponent} from "../employees/employees.component";

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgIf,
    EmployeesComponent
  ],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnChanges {
  @Input() employeesToFilter: Employee[] = [];
  filteredEmployees: Employee[] = [];

  // Automatically exectue when the input changes
  ngOnChanges() {
    // TODO: true
    this.filteredEmployees = this.employeesToFilter.filter(employee => true);
  }
}
