/**
 * tv
 */
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ITv } from '../../model';
import { TvActions, TvActionTypes } from '../actions/tv';

export interface State extends EntityState<ITv> {
    selectedTvId: number | null;
}

export const adapter: EntityAdapter<ITv> = createEntityAdapter<ITv>({
    selectId: tv => tv.id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
    selectedTvId: null,
});

export function reducer( state = initialState, action: TvActions ): State {
    switch (action.type) {
        case TvActionTypes.Load:
            return adapter.addOne(action.payload, {
                ...state,
                selectedTvId: state.selectedTvId
            });

        case TvActionTypes.Select:
            return {
                ...state,
                selectedTvId: action.payload,
            };

        default:
            return state;
    }
}

export const getSelectedId = ( state: State ) => state.selectedTvId;
