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
import {QualificationService} from "../service/qualification.service";

const SERVER_STATUS_ONLINE: string = 'Server: Online';
const SERVER_STATUS_OFFLINE: string = 'Server: Offline';
const USER_STATUS_AUTHORIZED: string = 'User: Authorized';
const USER_STATUS_UNAUTHORIZED: string = 'User: Unauthorized';


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
  serverStatus: string = 'User: Unknown';
  userStatus: string = 'User: Unknown';

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

  constructor(private qs: QualificationService) {
  }

  ngOnInit() {
    setInterval(() => {
      this.qs.getQualifications().subscribe({
        next: () => {
          this.serverStatus = SERVER_STATUS_ONLINE;
          this.userStatus = USER_STATUS_AUTHORIZED;
        },
        error: (err) => {
          if (err.status === 401) {
            this.serverStatus = SERVER_STATUS_ONLINE;
            this.userStatus = USER_STATUS_UNAUTHORIZED;
          } else {
            this.serverStatus = SERVER_STATUS_OFFLINE;
          }
        }
      });
    }, 100);
  }

  userStatusIcon(): string {
    if (this.userStatus === USER_STATUS_AUTHORIZED) {
      return 'check_circle'; // Icon for authorized user
    } else if (this.userStatus === USER_STATUS_UNAUTHORIZED) {
      return 'lock'; // Icon for unauthorized user
    } else {
      return 'help'; // Default icon
    }
  }

  serverStatusIcon(): string {
    if (this.serverStatus === SERVER_STATUS_ONLINE) {
      return 'cloud_done'; // Icon for online server
    } else if (this.serverStatus === SERVER_STATUS_OFFLINE) {
      return 'cloud_off'; // Icon for offline server
    } else {
      return 'help'; // Default icon
    }
  }

}
