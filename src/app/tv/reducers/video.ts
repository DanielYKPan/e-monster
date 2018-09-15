/**
 * video
 */
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IVideos } from '../../model';
import { TvVideosActions, TvVideosActionTypes } from '../actions/video';

export interface State extends EntityState<IVideos> {
    loading: boolean;
    selectedTvId: number | null;
}

export const adapter: EntityAdapter<IVideos> = createEntityAdapter<IVideos>({
    selectId: tvVideos => tvVideos.id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
    loading: false,
    selectedTvId: null
});

export function reducer( state = initialState, action: TvVideosActions ): State {
    switch (action.type) {

        case TvVideosActionTypes.SearchTvVideos: {
            return {
                ...state,
                loading: true
            };
        }

        case TvVideosActionTypes.SearchVideosCompleted:
            return adapter.addOne(action.payload.result, {
                ...state,
                loading: false,
                selectedTvId: action.payload.result.id
            });

        case TvVideosActionTypes.Select:
            return {
                ...state,
                loading: false,
                selectedTvId: action.payload.tv_id
            };

        default:
            return state;
    }
}

export const getSelectedId = ( state: State ) => state.selectedTvId;
export const getLoading = ( state: State ) => state.loading;
