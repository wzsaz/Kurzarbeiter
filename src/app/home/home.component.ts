import {Component, OnInit} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatAnchor, MatButton} from "@angular/material/button";
import {MatList, MatListItem} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {MatLine} from "@angular/material/core";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {GeneratorComponent} from "../generator/generator.component";
import {MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle} from "@angular/material/expansion";
import {EmployeeService} from "../service/employee.service";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    MatCardHeader,
    MatCard,
    MatCardContent,
    MatCardActions,
    MatAnchor,
    MatList,
    MatListItem,
    MatIcon,
    MatLine,
    MatCardTitle,
    MatCardSubtitle,
    MatButton,
    MatGridList,
    MatGridTile,
    GeneratorComponent,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    NgClass,
    NgForOf
  ],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  serverStatus: string = 'offline';
  serverStatusIcon: string = 'error';
  serverStatusText: string = 'Server is offline';

  aboutProjectText: string = 'Kurzarbeiter, an innovative solution, redefines organizational efficiency with its cutting-edge Angular-based frontend seamlessly integrated into the Employee Management Service (EMS). This dynamic dashboard not only streamlines backoffice operations but also envisions future adaptability on mobile platforms. Experience a singular, cohesive web application that anticipates and meets the evolving needs of modern organizational management, making Kurzarbeiter your gateway to streamlined and future-ready operations.';

  coreObjectives = [
    {
      icon: 'hub',
      title: 'Unified Interface',
      text: 'Central hub for accessing and managing employee data and project assignments.'
    },
    {
      icon: 'tune',
      title: 'Advanced Data Management',
      text: 'Advanced filtering capabilities to enhance decision-making processes.'
    },
    {
      icon: 'lock_open',
      title: 'Seamless Authentication',
      text: 'Keycloak SSO service to bolster security and usability.'
    },
    {
      icon: 'palette',
      title: 'Design and Usability',
      text: 'Focus on intuitive navigation and responsiveness to accommodate diverse needs.'
    }
    // Add more objectives as needed...
  ];

  constructor(private es: EmployeeService) {
  }

  ngOnInit() {
    this.es.getEmployee(0).pipe(
      catchError(error => {
        if (error.status === 401) {
          return of('unauthorized');
        } else if (error.status === 404) {
          return of('online');
        } else {
          return of(null);
        }
      })
    ).subscribe((data) => {
      if (data === null) {
        this.serverStatus = 'offline';
      } else if (typeof data === 'string') {
        this.serverStatus = data;
      } else {
        this.serverStatus = 'online';
      }

      if (this.serverStatus === 'online') {
        this.serverStatusIcon = 'check_circle';
        this.serverStatusText = 'Server is online';
      } else if (this.serverStatus === 'unauthorized') {
        this.serverStatusIcon = 'error';
        this.serverStatusText = 'Unauthorized';
      } else {
        this.serverStatusIcon = 'error';
        this.serverStatusText = 'Server is offline';
      }
    });
  }

}
