/**
 * actions
 */

import { Action } from '@ngrx/store';
import { IBook } from '../../model';

export enum BookActionTypes {
    Load = '[Books] Load',
    Select = '[Books] Select',
}

export class Load implements Action {
    readonly type = BookActionTypes.Load;

    constructor( public payload: { entity: IBook } ) {
    }
}

export class Select implements Action {
    readonly type = BookActionTypes.Select;

    constructor( public payload: { id: string } ) {
    }
}

export type BookActions =
    Load |
    Select;
