import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Employee} from "../types";
import {EmployeeService} from "../service/employee.service";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatChipsModule} from "@angular/material/chips";
import {FilterComponent} from "../filter/filter.component";
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {
  MatAccordion, MatExpansionPanel,
  MatExpansionPanelActionRow,
  MatExpansionPanelDescription, MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";

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
    MatAccordion,
    MatExpansionPanelActionRow,
    MatExpansionPanelDescription,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    MatExpansionPanel,
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];

  @Output() edit = new EventEmitter<Employee>();

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees
    });
  }

  openDeleteDialog(employee: Employee): void {
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

  onEdit(employee: Employee): void {
    this.edit.emit(employee);
  }

  onFilterApplied(filterValue: string): void {
    // Implement your filter logic here.
    // This might set a filter on your employees array or fetch a new list from your service.
    console.log("Filter applied: " + filterValue);
  }

  onDelete(employee: Employee): void {
    this.employeeService.deleteEmployee(employee.id).subscribe(() => {
      this.employees = this.employees.filter(e => e.id !== employee.id);
    });
  }
}
