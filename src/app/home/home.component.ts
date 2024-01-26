import {Component, OnInit} from '@angular/core';
import {ConfirmationSnackbarComponent} from "../confirm-dialog/confirm-snackbar.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    if (!sessionStorage.getItem('dialogShown')) {
      this.openDialog();
    }
  }

  openDialog() {
    sessionStorage.setItem('dialogShown', 'true');

    const dialogRef = this.dialog.open(ConfirmationSnackbarComponent, {
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
