/**
 * video
 */
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IVideos } from '../../model';
import { TvVideosActions, TvVideosActionTypes } from '../actions/video';

export interface State extends EntityState<IVideos> {
    selectedTvId: number | null;
}

export const adapter: EntityAdapter<IVideos> = createEntityAdapter<IVideos>({
    selectId: tvVideos => tvVideos.id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
    selectedTvId: null
});

export function reducer( state = initialState, action: TvVideosActions ): State {
    switch (action.type) {
        case TvVideosActionTypes.SearchVideosCompleted:
            return adapter.addOne(action.payload, {
                ...state,
                selectedTvId: action.payload.id
            });

        case TvVideosActionTypes.Select:
            return {
                ...state,
                selectedTvId: action.payload
            };

        default:
            return state;
    }
}

export const getSelectedId = ( state: State ) => state.selectedTvId;
