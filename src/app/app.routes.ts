import { Routes } from '@angular/router';
import { ViewComponent } from "./view/view.component";
import {FilterComponent} from "./filter/filter.component";
import {EditorComponent} from "./editor/editor.component";

export const routes: Routes = [
  { path: '', redirectTo: '/view', pathMatch: 'full' },
  { path: 'view', component: ViewComponent },
  { path: 'home', component: FilterComponent },
  { path: 'editor/:id', component: EditorComponent },
  // other routes...
];
