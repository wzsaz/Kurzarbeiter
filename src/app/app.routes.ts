import { Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import {FilterComponent} from "./filter/filter.component";
import {EditorComponent} from "./editor/editor.component";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'view', component: HomeComponent },
  { path: 'home', component: FilterComponent },
  { path: 'editor/:id', component: EditorComponent },
  // other routes...
];
