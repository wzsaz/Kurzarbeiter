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
import {AddQualificationDialogComponent} from "../confirm-dialog/add-confirm-dialog.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatBadgeModule} from "@angular/material/badge";
import {CanComponentDeactivate} from "../confirm-dialog/can-deactivate-guard.service";

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

  constructor(private qualificationService: QualificationService, public dialog: MatDialog) {
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

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddQualificationDialogComponent);

    const validateQualification = (qualification: QualificationUIState) => {
      if (!qualification.skill) return false;
      const exists = this.qualifications.some(q => q.skill === qualification.skill);
      return !exists;
    }

    dialogRef.afterClosed().subscribe(result => {
      if (result && validateQualification(result)) {
        const newQualification: Partial<QualificationDTO> = {skill: result};
        this.qualificationService.createQualification(newQualification).subscribe(qualification => {
          if (qualification) {
            this.qualifications.push(qualification);
          }
          return qualification;
        });
      } else {
        this.dialog.open(ConfirmDialogComponent, {
          data: {
            message: `Qualification already exists`,
            buttonText: {
              ok: 'Ok'
            }
          }
        });
      }
    });
  }

  openDeleteDialog(qualification: QualificationUIState): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: `Are you sure you want to delete ${qualification.skill}?`,
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        const index = this.qualifications.findIndex(q => q.id === qualification.id);
        if (index > -1) {
          this.qualificationService.deleteQualification(qualification.id).subscribe(() => {
            this.fetchQualifications();
          });
        }
      }
    });
  }
}
