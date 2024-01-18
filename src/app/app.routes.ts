import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {FilterComponent} from "./filter/filter.component";
import {EditorComponent} from "./editor/editor.component";
import {AuthGuard} from "./service/AuthGuard";

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'view', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'home', component: FilterComponent},
  {path: 'editor/:id', component: EditorComponent, canActivate: [AuthGuard]},
  // other routes...
];
