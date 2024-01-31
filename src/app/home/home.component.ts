import {Component, OnInit} from '@angular/core';
import {GeneratorComponent} from "../generator/generator.component";
import {MatToolbar} from "@angular/material/toolbar";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgIf} from "@angular/common";
import {QualificationService} from "../service/qualification.service";
import {EmployeeService} from "../service/employee.service";

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
    NgIf
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
    //delay the loading of the page to show the spinner
    this.fetchCurrentUser();
    this.checkServerStatus();
    this.loading = false;
  }

  fetchCurrentUser() {
    this.currentUser = "user"
  }

  checkServerStatus() {
    this.employeeService.getEmployees().subscribe(employees => {
      if (employees.length > 0) {
        this.serverStatus = 'Online';
        this.currentUserCount = employees.length.toString();
      } else {
        this.serverStatus = 'Offline';
        this.currentUserCount = 'Could not connect to server';
      }
    })

    this.qualificationService.getQualifications().subscribe(qualifications => {
      if (qualifications.length > 0) {
        this.serverStatus = 'Online';
        this.currentQualificationCount = qualifications.length.toString();
      } else {
        this.serverStatus = 'Offline';
        this.currentQualificationCount = 'Could not connect to server';
      }
    })
  }
}
