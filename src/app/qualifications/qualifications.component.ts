import {Component, OnInit} from '@angular/core';
import {Qualification, QualificationUIState} from "../types";
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
import {forkJoin} from "rxjs";
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

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newQualification: Partial<Qualification> = {skill: result};
        this.qualifications.push(newQualification as QualificationUIState);
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
          this.qualifications.splice(index, 1);
        }
      }
    });
  }

  saveAll(): void {
    const newQualifications = this.qualifications.filter(qualification => !qualification.id);
    const updatedQualifications = this.qualifications.filter((qualification, index) => {
      return qualification.id && JSON.stringify(qualification) !== JSON.stringify(this.originalQualifications[index]);
    });
    const deletedQualifications = this.originalQualifications.filter(oq => !this.qualifications.some(q => q.id === oq.id));

    const validNewQualifications = newQualifications.filter(qualification => this.validateQualification(qualification));
    const validUpdatedQualifications = updatedQualifications.filter(qualification => this.validateQualification(qualification));

    const createRequests = validNewQualifications.map(qualification => this.qualificationService.createQualification(qualification));
    const updateRequests = validUpdatedQualifications.map(qualification => this.qualificationService.updateQualification(qualification.id, qualification));
    const deleteRequests = deletedQualifications.map(qualification => this.qualificationService.deleteQualification(qualification.id));

    forkJoin([...createRequests, ...updateRequests, ...deleteRequests]).subscribe(() => {
      this.fetchQualifications();
      this.originalQualifications = JSON.parse(JSON.stringify(this.qualifications));
    });
  }

  validateQualification(qualification: QualificationUIState): boolean {
    const exists = this.qualifications.some(q => q.skill === qualification.skill && q.id !== qualification.id);
    return !exists;
  }
}
