import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {Observable, of} from 'rxjs';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {catchError, map} from 'rxjs/operators';

export interface CanComponentDeactivate {
  hasUnsavedChanges: () => boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuardService {
  constructor(public dialog: MatDialog) {}

  canDeactivate(component: CanComponentDeactivate, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!component.hasUnsavedChanges()) return true;

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
      map(result => result),
      catchError((error) => {
        const router = inject(Router);
        return of(router.createUrlTree(['route-to-fallback-page']));
      })
    );
  }
}
