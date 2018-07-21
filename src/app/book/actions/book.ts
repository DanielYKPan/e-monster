/**
 * actions
 */

import { Action } from '@ngrx/store';
import { IBook } from '../../model';

export enum BookActionTypes {
    Load = '[Books] Load',
    Select = '[Books] Select',
    SearchCompleted = '[Books] SearchCompleted',
}

export class Load implements Action {
    readonly type = BookActionTypes.Load;

    constructor( public payload: IBook ) {
    }
}

export class Select implements Action {
    readonly type = BookActionTypes.Select;

    constructor( public payload: string ) {
    }
}

export class SearchCompleted implements Action {
    readonly type = BookActionTypes.SearchCompleted;

    constructor( public payload: IBook[] ) {
    }
}

export type BookActions =
    Load |
    Select |
    SearchCompleted;
