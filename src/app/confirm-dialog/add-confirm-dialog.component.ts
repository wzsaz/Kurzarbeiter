import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {CustomDialogComponent} from "./custom-dialog.component";

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, ReactiveFormsModule, NgIf, MatInputModule],
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      <mat-form-field>
        <input matInput placeholder="Qualification" [formControl]="qualificationControl" required>
        @if (qualificationControl.invalid) {
          <mat-error>Qualification is required</mat-error>
        }
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-raised-button mat-dialog-close>Cancel</button>
      <button mat-raised-button [mat-dialog-close]="qualificationControl.value" [disabled]="qualificationControl.invalid">
        {{ data.title.split(' ')[0] }}
      </button>
    </mat-dialog-actions>
  `,
})
export class AddEditQualificationDialogComponent extends CustomDialogComponent {
  qualificationControl = new FormControl('', Validators.required);

  constructor(@Inject(MAT_DIALOG_DATA) public override data: any) {
    super(data);
    this.qualificationControl.setValue(data.qualification?.skill);
  }
}
