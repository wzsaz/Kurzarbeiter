import {Injectable, inject} from '@angular/core';
import {UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {Observable, of} from 'rxjs';
import {ConfirmDialogComponent} from './confirm-dialog.component';
import { map, catchError } from 'rxjs/operators';

export interface CanComponentDeactivate {
  hasUnsavedChanges: () => boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuardService {
  constructor(public dialog: MatDialog) {}

  canDeactivate(component: CanComponentDeactivate, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (component.hasUnsavedChanges()) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          message: 'You have unsaved changes. Are you sure you want to leave?',
          buttonText: {
            ok: 'Yes',
            cancel: 'No'
          }
        }
      });

      return dialogRef.afterClosed().pipe(
        map(result => result), // Return the result of the dialog
        catchError((error) => {
          const router = inject(Router);
          return of(router.createUrlTree(['route-to-fallback-page']));
        })
      );
    } else {
      return true;
    }
  }
}
