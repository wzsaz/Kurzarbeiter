import {Component, OnInit} from '@angular/core';
import {QualificationDTO, QualificationUIState} from "../types";
import {NgForOf, NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatChipsModule} from "@angular/material/chips";
import {FilterComponent} from "../filter/filter.component";
import {MatDialog} from '@angular/material/dialog';
import {QualificationService} from "../service/qualification.service";
import {MatListModule} from "@angular/material/list";
import {MatLineModule} from "@angular/material/core";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatBadgeModule} from "@angular/material/badge";
import {CanComponentDeactivate} from "../confirm-dialog/can-deactivate-guard.service";
import {AddEditQualificationDialogComponent} from "../confirm-dialog/add-confirm-dialog.component";
import {EmployeeService} from "../service/employee.service";
import {CustomDialogComponent} from "../confirm-dialog/CustomDialogComponent";

@Component({
  selector: 'app-qualifications',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    FilterComponent,
    MatListModule,
    MatLineModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatBadgeModule,
  ],
  templateUrl: './qualifications.component.html',
  styleUrl: './qualifications.component.css'
})
export class QualificationsComponent implements OnInit, CanComponentDeactivate {
  qualifications: QualificationUIState[] = [];
  originalQualifications: QualificationUIState[] = [];

  constructor(private qualificationService: QualificationService, public dialog: MatDialog, private employeeService: EmployeeService) {
  }

  hasUnsavedChanges(): boolean {
    const qualificationsSkills = this.qualifications.map(q => q.skill);
    const originalQualificationsSkills = this.originalQualifications.map(q => q.skill);
    return JSON.stringify(qualificationsSkills) !== JSON.stringify(originalQualificationsSkills);
  }

  ngOnInit(): void {
    this.fetchQualifications();
  }

  fetchQualifications(): void {
    this.qualificationService.getQualifications().subscribe(qualifications => {
      this.qualifications = qualifications;
      this.originalQualifications = JSON.parse(JSON.stringify(qualifications)); // Deep copy
    });
  }

  openDialog(qualification?: QualificationUIState): void {
    const dialogRef = this.dialog.open(AddEditQualificationDialogComponent, {
      data: {
        qualification,
        title: qualification ? 'Edit Qualification' : 'Add Qualification'
      }
    });

    const validateQualification = (skill: string): boolean => {
      if (!skill || skill.trim().length === 0) return false;
      return !this.qualifications.some(q => q.skill === skill);
    }

    dialogRef.afterClosed().subscribe(result => {
      if (validateQualification(result)) {
        if (qualification) {
          this.editQualification(qualification, result);
        } else {
          this.addQualification(result);
        }
      } else {
        console.log('Validation failed! -> Handling not implemented yet');
      }
    });
  }

  addQualification(skill: string): void {
    const newQualification: Partial<QualificationDTO> = {skill};
    this.qualificationService.createQualification(newQualification).subscribe(qualification => {
      if (qualification) {
        this.qualifications.push(qualification);
      }
    });
  }

  editQualification(qualification: QualificationUIState, skill: string): void {
    const updatedQualification: QualificationDTO = {id: qualification.id, skill};
    this.qualificationService.updateQualification(qualification.id, updatedQualification).subscribe(updated => {
      if (updated) {
        const index = this.qualifications.findIndex(q => q.id === updated.id);
        if (index > -1) {
          this.qualifications[index] = updated;
        }
      }
    });
  }

  openDeleteDialog(qualification: QualificationUIState): void {
    this.employeeService.getEmployees().subscribe(employees => {
      const employeesWithQualification = employees.filter(employee =>
        employee.skillSet.some(skill => skill.id === qualification.id)
      );

      let message = `Are you sure you want to delete ${qualification.skill}?`;
      if (employeesWithQualification.length > 0) {
        const employeeNames = employeesWithQualification.map(employee => `<li>${employee.firstName} ${employee.lastName}</li>`).join('');
        message += ` The following employees will lose this qualification: <ul>${employeeNames}</ul>`;
      }

      const dialogRef = this.dialog.open(CustomDialogComponent, {
        data: {
          title: 'Delete Qualification',
          message,
        }
      });

      dialogRef.afterClosed().subscribe(confirmed => {
        if (confirmed) {
          this.qualificationService.deleteQualification(qualification.id).subscribe(() => {
            this.fetchQualifications();
          });
        }
      });
    });
  }
}