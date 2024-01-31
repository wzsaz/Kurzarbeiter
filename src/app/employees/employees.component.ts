import {AfterViewInit, Component, DoCheck, Input, ViewChild} from '@angular/core';
import {Employee} from "../types";
import {EmployeeService} from "../service/employee.service";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatChipsModule} from "@angular/material/chips";
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatListModule} from "@angular/material/list";
import {MatBadgeModule} from "@angular/material/badge";
import {Router} from "@angular/router";
import {EmployeeComponent} from "../employee/employee.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

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
    NgOptimizedImage,
    MatExpansionModule,
    MatListModule,
    MatBadgeModule,
    EmployeeComponent,
    MatPaginator,
    MatProgressSpinner
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent implements AfterViewInit, DoCheck {
  @Input() inputEmployees: Employee[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoading = true;

  paginatedEmployees: Employee[] = [];

  pageSize = 5;
  pageSizeOptions = [5, 10, 20];
  showFirstLastButtons = true;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private es: EmployeeService
  ) {
    this.isLoading = true; // set isLoading to true when the component is initialized
  }

  ngDoCheck(): void {
    if (this.inputEmployees.length !== this.paginatedEmployees.length) {
      this.loadPage();
    }
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe(() => this.loadPage());
  }

  loadPage() {
    if (this.paginatedEmployees.length === this.inputEmployees.length) {
      return;
    }
    this.isLoading = false
    const start = this.paginator.pageIndex * this.paginator.pageSize;
    const end = start + this.paginator.pageSize;
    this.paginatedEmployees = this.inputEmployees.slice(start, end);
  }

  handleEdit(employee: Employee): void {
    this.router.navigate(['/editor', employee.id]).then();
  }

  handleDelete(employee: Employee): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: `Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`,
        buttonText: {
          ok: 'Delete',
          cancel: 'Cancel'
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.es.deleteEmployee(employee.id).subscribe(() => {
          this.inputEmployees = this.inputEmployees.filter(({id}) => id !== employee.id);
        });
      }
    });
  }

}
