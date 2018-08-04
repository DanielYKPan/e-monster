/**
 * actions
 */

import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
    ShowLoader = '[Loader] Show',
    HideLoader = '[Loader] Hide',
    ToggleSidenav = '[Sidenav] Toggle',
    OpenSidenav = '[Sidenav] Open',
    CloseSidenav = '[Sidenav] Close',
}

export class ShowLoader implements Action {
    readonly type = LayoutActionTypes.ShowLoader;
}

export class HideLoader implements Action {
    readonly type = LayoutActionTypes.HideLoader;
}

export class OpenSidenav implements Action {
    readonly type = LayoutActionTypes.OpenSidenav;
}

export class CloseSidenav implements Action {
    readonly type = LayoutActionTypes.CloseSidenav;
}

export class ToggleSidenav implements Action {
    readonly type =LayoutActionTypes.ToggleSidenav;
}

export type LayoutActions =
    ShowLoader |
    HideLoader |
    ToggleSidenav |
    OpenSidenav |
    CloseSidenav;
