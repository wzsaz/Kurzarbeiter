import {Routes} from '@angular/router';
import {EditorComponent} from "./editor/editor.component";
import {AuthguardService} from "./service/authguard.service";
import {QualificationsComponent} from "./qualifications/qualifications.component";
import {HomeComponent} from "./home/home.component";
import {CanDeactivateGuardService} from "./service/can-deactivate-guard.service";
import {PrivacyPolicyComponent} from "./privacy-policy/privacy-policy.component";
import {EmployeesComponent} from "./employees/employees.component";

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'view', component: EmployeesComponent, canActivate: [AuthguardService]},
  {
    path: 'editor',
    component: EditorComponent,
    canActivate: [AuthguardService],
    canDeactivate: [CanDeactivateGuardService]
  },
  {
    path: 'editor/:id',
    component: EditorComponent,
    canActivate: [AuthguardService],
    canDeactivate: [CanDeactivateGuardService]
  },
  {path: 'qualifications', component: QualificationsComponent, canActivate: [AuthguardService]},
  {path: 'privacy-policy', component: PrivacyPolicyComponent},
];
