/**
 * tv
 */
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ITv } from '../../model';
import { TvActions, TvActionTypes } from '../actions/tv';
import { CollectionActions, CollectionActionTypes } from '../actions/collection';

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

export function reducer( state = initialState, action: TvActions | CollectionActions ): State {
    switch (action.type) {

        case CollectionActionTypes.LoadSuccess:
            return adapter.addMany(action.payload.entities, {
                ...state,
                selectedTvId: state.selectedTvId
            });

        case TvActionTypes.Load:
            return adapter.addOne(action.payload.entity, {
                ...state,
                selectedTvId: state.selectedTvId
            });

        case TvActionTypes.UpdateTV:
            return adapter.updateOne(action.payload.entity, {
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
export const getSelectedSeasonNum = ( state: State ) => state.selectedTvSeasonNum;
