/**
 * tv
 */
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ITv } from '../../model';
import { TvActions, TvActionTypes } from '../actions/tv';

export interface State extends EntityState<ITv> {
    selectedTvId: number | null;
    selectedTvSeasonNum: number | null;
}

export const adapter: EntityAdapter<ITv> = createEntityAdapter<ITv>({
    selectId: tv => tv.id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
    selectedTvId: null,
    selectedTvSeasonNum: null,
});

export function reducer( state = initialState, action: TvActions ): State {
    switch (action.type) {
        case TvActionTypes.Load:
            return adapter.addOne(action.payload, {
                ...state,
                selectedTvId: state.selectedTvId
            });

        case TvActionTypes.UpdateTV:
            return adapter.updateOne(action.payload.tv, {
                ...state,
                selectedTvId: state.selectedTvId
            });

        case TvActionTypes.Select:
            return {
                ...state,
                selectedTvId: action.payload.tv_id,
                selectedTvSeasonNum: action.payload.season_number || state.selectedTvSeasonNum
            };

        default:
            return state;
    }
}

export const getSelectedId = ( state: State ) => state.selectedTvId;
export const getSelectedSeasonNum = (state: State) => state.selectedTvSeasonNum;
