import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EmployeeResponseDTO, EmployeeUIState} from "../types";
import {EmployeeService} from "../employee.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-detailview',
  standalone: true,
  imports: [
    NgForOf
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
}
