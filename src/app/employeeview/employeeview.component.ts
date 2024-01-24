import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EmployeeUIState} from "../types";
import {EmployeeService} from "../service/employee.service";
import {NgForOf, NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatChipsModule} from "@angular/material/chips";
import {FilterComponent} from "../filter/filter.component";
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-employeeview',
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
  templateUrl: './employeeview.component.html',
  styleUrl: './employeeview.component.css'
})
export class EmployeeviewComponent implements OnInit {
  employees: EmployeeUIState[] = [];

  @Output() edit = new EventEmitter<EmployeeUIState>();

  constructor(private employeeService: EmployeeService, public dialog: MatDialog) {
  } // Inject MatDialog

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees.map(employee => ({...employee, showDetails: false, pictureUrl: 'path_to_picture'}));
    });
  }

  openDeleteDialog(employee: EmployeeUIState): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: `Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`,
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.onDelete(employee);
      }
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

  onDelete(employee: EmployeeUIState): void {
    this.employeeService.deleteEmployee(employee.id).subscribe(() => {
      this.employees = this.employees.filter(e => e.id !== employee.id);
    });
  }
}
