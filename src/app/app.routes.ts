import {Routes} from '@angular/router';
import {ViewComponent} from "./view/view.component";
import {FilterComponent} from "./filter/filter.component";
import {EditorComponent} from "./editor/editor.component";
import {AuthguardService} from "./service/authguard.service";
import {QualificationsComponent} from "./qualifications/qualifications.component";
import {HomeComponent} from "./home/home.component";
import {CanDeactivateGuardService} from "./service/can-deactivate-guard.service";

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'view', component: ViewComponent, canActivate: [AuthguardService]},
  {path: 'editor', component: EditorComponent, canActivate: [AuthguardService], /*canDeactivate: [CanDeactivateGuardService]*/},
  {path: 'editor/:id', component: EditorComponent, canActivate: [AuthguardService], /*canDeactivate: [CanDeactivateGuardService]*/},
  {path: 'qualifications', component: QualificationsComponent, canActivate: [AuthguardService]},
];
