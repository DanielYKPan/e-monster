/**
 * actions
 */

import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
    OpenSidenav = '[Sidenav] Open',
    CloseSidenav = '[Sidenav] Close',
    ToggleSidenav = '[Sidenav] Toggle',
}

export class OpenSidenav implements Action {
    readonly type = LayoutActionTypes.OpenSidenav;
}

export class CloseSidenav implements Action {
    readonly type = LayoutActionTypes.CloseSidenav;
}

export class ToggleSidenav implements Action {
    readonly type = LayoutActionTypes.ToggleSidenav;
}

export type LayoutActions = OpenSidenav | CloseSidenav | ToggleSidenav;
