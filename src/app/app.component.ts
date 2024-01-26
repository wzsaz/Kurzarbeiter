import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ViewComponent} from "./view/view.component";
import {CommonModule} from "@angular/common";
import {NavbarComponent} from "./navbar/navbar.component";
import {KeycloakAngularModule} from "keycloak-angular";
import {EditorComponent} from "./editor/editor.component";
import {ReactiveFormsModule} from "@angular/forms";
import {BaseService} from "./service/base.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfirmationSnackbarComponent} from "./confirm-dialog/confirm-snackbar.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    ViewComponent,
    ReactiveFormsModule,
    EditorComponent,
    KeycloakAngularModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Kurzarbeiter';

  constructor(private dialog: MatDialog) {
    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmationSnackbarComponent, {
      width: '500px', // Set the width of the dialog
      disableClose: true // Disable closing the dialog by clicking outside of it
      // Other dialog options can be set here
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle what happens after the dialog is closed
      console.log(`Dialog result: ${result}`); // You can handle the result of the dialog here
      // For example, you can navigate to another page, show a message, etc.
    });
  }
}
