import {Component, OnInit} from '@angular/core';
import {GeneratorComponent} from "../generator/generator.component";
import {MatToolbar} from "@angular/material/toolbar";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgIf} from "@angular/common";
import {QualificationService} from "../service/qualification.service";
import {EmployeeService} from "../service/employee.service";
import {MatIcon} from "@angular/material/icon";
import {fa, th} from "@faker-js/faker";
import {forkJoin} from "rxjs";
import {MatList, MatListItem, MatListSubheaderCssMatStyler} from "@angular/material/list";
import {MatLine} from "@angular/material/core";
import {MatAnchor} from "@angular/material/button";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    GeneratorComponent,
    MatToolbar,
    MatGridList,
    MatGridTile,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatProgressSpinner,
    MatCardSubtitle,
    MatCardTitle,
    NgIf,
    MatIcon,
    MatCardActions,
    MatListItem,
    MatList,
    MatListSubheaderCssMatStyler,
    MatLine,
    MatAnchor
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  loading = true;
  currentUser: string = 'Not logged in';
  serverStatus: string = 'Offline';
  currentUserCount: string = '0';
  currentQualificationCount: string = '0';

  constructor(
    private employeeService: EmployeeService,
    private qualificationService: QualificationService) {
  }

  ngOnInit() {
    this.checkServerStatus();
    this.loading = false;
  }

  checkServerStatus() {
    const employeesRequest = this.employeeService.getEmployees();
    const qualificationsRequest = this.qualificationService.getQualifications();

    forkJoin([employeesRequest, qualificationsRequest]).subscribe({
      next: ([employees, qualifications]) => {
        // Assuming 'getEmployees' and 'getQualifications' return arrays
        if (employees && qualifications) {
          this.serverStatus = 'Online';
          this.currentUserCount = employees.length.toString();
          this.currentQualificationCount = qualifications.length.toString();
          //todo: maybe fix this and use keycloak to get the name out of keycloak profile
          this.currentUser = "user";
        }
        throw new Error('Invalid response from server');
      },
      error: () => {
        this.serverStatus = 'Offline';
        this.currentUserCount = 'Error connecting to server';
        this.currentQualificationCount = 'Error connecting to server';
        this.currentUser = 'Error connecting to server';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
