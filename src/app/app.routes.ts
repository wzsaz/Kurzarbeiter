import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {FilterComponent} from "./filter/filter.component";
import {EditorComponent} from "./editor/editor.component";
import {AuthGuard} from "./service/AuthGuard";
import {QualificationsComponent} from "./qualifications/qualifications.component";
import {CanDeactivateGuardService} from "./confirm-dialog/can-deactivate-guard.service";

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'view', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'home', component: FilterComponent},
  {path: 'editor/:id', component: EditorComponent, canActivate: [AuthGuard]},
  {path: 'qualifications', component: QualificationsComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuardService]},
  // other routes...
];
