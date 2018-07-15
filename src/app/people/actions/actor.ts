/**
 * actor
 */

import { Action } from '@ngrx/store';
import { IActor } from '../../model/people';

export enum ActorActionTypes {
    Select = '[Actor] Select',
    Load = '[Actor] Load',
}

export class Select implements Action {
    readonly type = ActorActionTypes.Select;

    constructor( public payload: number ) {
    }
}

export class Load implements Action {
    readonly type = ActorActionTypes.Load;

    constructor(public payload: IActor) {
    }
}

export type ActorActions =
    Select |
    Load;
