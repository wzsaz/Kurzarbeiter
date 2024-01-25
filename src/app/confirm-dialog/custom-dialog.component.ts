import { Component, Inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-custom-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
      <h2 mat-dialog-title>{{ data.title }}</h2>
      <mat-dialog-content [innerHTML]="data.message"></mat-dialog-content>
      <mat-dialog-actions>
          <button mat-button mat-dialog-close>No</button>
          <button mat-button [mat-dialog-close]="true">Yes</button>
      </mat-dialog-actions>
  `,
})
export class CustomDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
