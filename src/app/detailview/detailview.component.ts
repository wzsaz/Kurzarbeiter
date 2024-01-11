import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EmployeeResponseDTO, EmployeeUIState} from "../types";
import {EmployeeService} from "../employee.service";
import {NgForOf, NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatChipsModule} from "@angular/material/chips";
import {FilterComponent} from "../filter/filter.component";

@Component({
  selector: 'app-detailview',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    FilterComponent,
  ],
  templateUrl: './detailview.component.html',
  styleUrl: './detailview.component.css'
})
export class DetailviewComponent implements OnInit {
  employees: EmployeeUIState[] = [];

  @Output() edit = new EventEmitter<EmployeeUIState>();

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees.map(employee => ({ ...employee, showDetails: false, pictureUrl: 'path_to_picture' }));
    });
  }

  onEdit(employee: EmployeeUIState): void {
    this.edit.emit(employee);
  }

  onDetails(employee: EmployeeUIState): void {
    employee.showDetails = !employee.showDetails;
  }

  onFilterApplied(filterValue: string): void {
    // Implement your filter logic here.
    // This might set a filter on your employees array or fetch a new list from your service.
    console.log("Filter applied: " + filterValue);
  }
}
