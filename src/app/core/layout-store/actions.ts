/**
 * actions
 */

import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
    ShowLoader = '[Loader] Show',
    HideLoader = '[Loader] Hide',
}

export class ShowLoader implements Action {
    readonly type = LayoutActionTypes.ShowLoader;
}

export class HideLoader implements Action {
    readonly type = LayoutActionTypes.HideLoader;
}

export type LayoutActions =
    ShowLoader |
    HideLoader;
