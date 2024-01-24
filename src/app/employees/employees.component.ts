import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EmployeeResponseDTO, EmployeeUIState} from "../types";
import {EmployeeService} from "../service/employee.service";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatChipsModule} from "@angular/material/chips";
import {FilterComponent} from "../filter/filter.component";
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    FilterComponent,
    NgOptimizedImage,
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit {
  employees: EmployeeUIState[] = [];

  @Output() edit = new EventEmitter<EmployeeUIState>();

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog
  ) {
  } // Inject MatDialog

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees.map((employee: EmployeeResponseDTO) => ({
        ...employee,
        showDetails: false,
        pictureUrl: `https://i.pravatar.cc/200?img=${employee.id}`
      }));
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
