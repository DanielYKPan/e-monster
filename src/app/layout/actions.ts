/**
 * actions
 */

import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
    OpenSidenav = '[Sidenav] Open',
    CloseSidenav = '[Sidenav] Close',
    ToggleSidenav = '[Sidenav] Toggle',
    ShowLoader = '[Loader] Show',
    HideLoader = '[Loader] Hide',
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

export class ShowLoader implements Action {
    readonly type = LayoutActionTypes.ShowLoader;
}

export class HideLoader implements Action {
    readonly type = LayoutActionTypes.HideLoader;
}

export type LayoutActions =
    OpenSidenav |
    CloseSidenav |
    ToggleSidenav |
    ShowLoader |
    HideLoader ;
