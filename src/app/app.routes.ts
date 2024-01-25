import {Routes} from '@angular/router';
import {ViewComponent} from "./view/view.component";
import {FilterComponent} from "./filter/filter.component";
import {EditorComponent} from "./editor/editor.component";
import {AuthguardService} from "./service/authguard.service";
import {QualificationsComponent} from "./qualifications/qualifications.component";

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'view', component: ViewComponent, canActivate: [AuthguardService]},
  {path: 'home', component: FilterComponent},
  {path: 'editor', component: EditorComponent, canActivate: [AuthguardService]},
  {path: 'editor/:id', component: EditorComponent, canActivate: [AuthguardService]},
  {path: 'qualifications', component: QualificationsComponent, canActivate: [AuthguardService]},
  // other routes...
];
