import {Component, ElementRef, ViewChild} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from "@angular/material/button";

interface Agreements {
  [key: string]: boolean;
}

@Component({
  selector: 'app-confirmation-snackbar',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogContent,
    MatDialogActions,
    MatCheckboxModule
  ],
  template: `
      <mat-dialog-content class="cookie-content">
          <div class="license-agreement" #scrollDiv (scroll)="onScroll()">
              <p>Welcome to the most exciting part of our website – the cookie policy! Here, you'll find an endless wall of text that's as thrilling as watching paint dry. But don't worry, it's only slightly longer than a Tolstoy novel.</p>
              <p>By scrolling, you'll embark on an epic journey through the riveting world of legal jargon, where each sentence is more exciting than the last.</p>
              <!-- Add more mock content here -->
          </div>
          <div class="agreement-checkboxes">
              <mat-checkbox (change)="updateAgreement($event, 'agreement1')">I solemnly swear I'm up to no good with these cookies.</mat-checkbox>
              <mat-checkbox (change)="updateAgreement($event, 'agreement2')">Sure, track my every move. I love being watched.</mat-checkbox>
              <!-- More checkboxes as needed -->
          </div>
      </mat-dialog-content>
      <mat-dialog-actions>
          <button mat-button [disabled]="!allAgreed" (click)="agree()">I Agree (What's the worst that could happen?)</button>
      </mat-dialog-actions>
  `,
  styles: [`
    .cookie-content { /* Styling for the content */
    }

    .license-agreement { /* Styling for the scrollable area */
    }

    .agreement-checkboxes { /* Styling for checkboxes */
    }
  `]
})
export class ConfirmationSnackbarComponent {
  allAgreed = false;
  agreements: Agreements = {agreement1: false};

  @ViewChild('scrollDiv') scrollDiv!: ElementRef;

  constructor(public dialogRef: MatDialogRef<ConfirmationSnackbarComponent>) {
  }

  onScroll() {
    const element = this.scrollDiv.nativeElement;
    const atBottom = element.scrollHeight - element.scrollTop <= element.clientHeight;
    if (atBottom) {
      this.allAgreed = this.checkAgreements();
    }
  }

  updateAgreement(event: MatCheckboxChange, agreementKey: string) {
    this.agreements[agreementKey] = event.checked;
    this.allAgreed = this.checkAgreements();
  }

  checkAgreements(): boolean {
    return Object.values(this.agreements).every(val => val);
  }

  agree() {
    this.dialogRef.close();
    // Logic to save agreement state
  }
}
