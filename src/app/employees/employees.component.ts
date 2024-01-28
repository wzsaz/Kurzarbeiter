import {Component, Input} from '@angular/core';
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
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
  @Input() inputEmployees: Employee[] = [];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private es: EmployeeService
  ) {
  }

  randomImage(id: number): string {
    const mod = id % 70;
    return 'https://i.pravatar.cc/200?img=' + mod;
  }

  openDeleteDialog(employee: Employee): void {
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
        this.onDeleteView(employee)
      }
    });
  }

  onEdit(employee: Employee): void {
    this.router.navigate(['/editor', employee.id]).then(r => console.log(r));
  }

  onDeleteView(deletedEmployee: Employee): void {
    this.es.deleteEmployee(deletedEmployee.id).subscribe(() => {
      this.inputEmployees = this.inputEmployees.filter(employee => employee.id !== deletedEmployee.id);
    });
  }

}
