import {Component} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, ReactiveFormsModule, NgIf, MatInputModule],
  template: `
      <h2 mat-dialog-title>Add Qualification</h2>
      <mat-dialog-content>
          <mat-form-field>
              <input matInput placeholder="Qualification" [formControl]="qualificationControl" required>
              <mat-error *ngIf="qualificationControl.invalid">Qualification is required</mat-error>
          </mat-form-field>
      </mat-dialog-content>
      <mat-dialog-actions>
          <button mat-button mat-dialog-close>Cancel</button>
          <button mat-button [mat-dialog-close]="qualificationControl.value" [disabled]="qualificationControl.invalid">
              Add
          </button>
      </mat-dialog-actions>
  `,
})
export class AddQualificationDialogComponent {
  qualificationControl = new FormControl('', Validators.required);
}
