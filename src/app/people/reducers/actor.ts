/**
 * actor
 */
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IActor } from '../../model/people';
import { ActorActions, ActorActionTypes } from '../actions/actor';

export interface State extends EntityState<IActor> {
    selectedActorId: number | null;
}

export const adapter: EntityAdapter<IActor> = createEntityAdapter<IActor>({
    selectId: actor => actor.id,
    sortComparer: false
});

export const initialState: State = adapter.getInitialState({
    selectedActorId: null,
});

export function reducer( state = initialState, action: ActorActions ): State {
    switch (action.type) {
        case ActorActionTypes.Load:
            return adapter.addOne(action.payload, {
                ...state,
                selectedActorId: state.selectedActorId
            });

        case ActorActionTypes.Select:
            return {
                ...state,
                selectedActorId: action.payload,
            };

        default:
            return state;
    }
}

export const getSelectedId = ( state: State ) => state.selectedActorId;
