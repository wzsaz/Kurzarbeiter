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
import {MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle} from "@angular/material/expansion";
import {NgClass, NgForOf} from "@angular/common";
import {EmployeeService} from "../service/employee.service";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";

const SERVER_STATUS_ONLINE: string = 'Server: Online';
const SERVER_STATUS_OFFLINE: string = 'Server: Offline';
const SERVER_STATUS_UNKNOWN: string = 'Server: Unknown';

const USER_STATUS_AUTHORIZED: string = 'User: Authorized';
const USER_STATUS_UNAUTHORIZED: string = 'User: Unauthorized';
const USER_STATUS_UNKNOWN: string = 'User: Unknown';


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
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    NgClass,
    NgForOf
  ],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  serverStatus: string = SERVER_STATUS_UNKNOWN
  userStatus: string = USER_STATUS_UNKNOWN

  aboutProjectText: string = 'Kurzarbeiter, an innovative solution, redefines organizational efficiency with its cutting-edge Angular-based frontend seamlessly integrated into the Employee Management Service (EMS). This dynamic dashboard not only streamlines backoffice operations but also envisions future adaptability on mobile platforms. Experience a singular, cohesive web application that anticipates and meets the evolving needs of modern organizational management, making Kurzarbeiter your gateway to streamlined and future-ready operations.';

  features = [
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
  ];

  constructor(private es: EmployeeService) {
  }

  ngOnInit() {
    const delay = 10_000;
    let currentDelay = delay;

    const pingServer = () => {
      console.log("Pinging backend. Current backoff delay: " + currentDelay);
      // Workaround for backend not supporting pinging
      this.es.getEmployee(-1).pipe(
        catchError(error => of(error.status))
      ).subscribe({
        next: (status) => {
          switch (status) {
            case 401: currentDelay = delay; break;
            case 404: currentDelay = delay; break;
            default: currentDelay = Math.min(currentDelay * 2, 60000);
          }
          this.updateStatus(status);
        },
        complete: () => setTimeout(pingServer, currentDelay)
      });
    };

    pingServer();
  }

  private updateStatus(status: number) {
    if (status === 401) {
      this.serverStatus = SERVER_STATUS_ONLINE;
      this.userStatus = USER_STATUS_UNAUTHORIZED;
    } else if (status === 404) {
      this.serverStatus = SERVER_STATUS_ONLINE;
      this.userStatus = USER_STATUS_AUTHORIZED;
    } else {
      this.serverStatus = SERVER_STATUS_OFFLINE;
      this.userStatus = USER_STATUS_UNKNOWN;
    }
  }

  get userStatusIcon(): string {
    switch (this.userStatus) {
      case USER_STATUS_AUTHORIZED:
        return 'check_circle';
      case USER_STATUS_UNAUTHORIZED:
        return 'lock';
    }
    return 'help'
  }

  get serverStatusIcon(): string {
    switch (this.serverStatus) {
      case SERVER_STATUS_ONLINE:
        return 'cloud_done';
      case SERVER_STATUS_OFFLINE:
        return 'cloud_off';
    }
    return 'help'
  }
}
