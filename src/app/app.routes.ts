import { Routes } from '@angular/router';
import { ViewComponent } from "./view/view.component";

export const routes: Routes = [
  { path: '', redirectTo: '/view', pathMatch: 'full' },
  { path: 'view', component: ViewComponent },
  // other routes...
];
