/**
 * index
 */

import * as fromTvs from './tv';
import * as fromVideos from './video';
import * as fromRoot from '../../reducers';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface TvsState {
    tvs: fromTvs.State;
    videos: fromVideos.State;
}

export interface State extends fromRoot.State {
    tvs: TvsState;
}

export const reducers: ActionReducerMap<TvsState> = {
    tvs: fromTvs.reducer,
    videos: fromVideos.reducer,
};

export const getTvsState = createFeatureSelector<TvsState>('tvs');

export const getTvEntityState = createSelector(
    getTvsState,
    ( state: TvsState ) => state.tvs
);

export const getTvVideosEntityState = createSelector(
    getTvsState,
    ( state: TvsState ) => state.videos
);

export const {
    selectIds: getTvIds,
    selectEntities: getTvEntities,
    selectAll: getAllTvs,
    selectTotal: getTotalTvs,
} = fromTvs.adapter.getSelectors(getTvEntityState);

export const getSelectedTvId = createSelector(
    getTvEntityState,
    fromTvs.getSelectedId
);

export const getSelectedTv = createSelector(
    getTvEntities,
    getSelectedTvId,
    ( entities, selectedId ) => {
        return selectedId && entities[selectedId];
    }
);

export const {
    selectEntities: getTvVideosEntities,
} = fromVideos.adapter.getSelectors(getTvVideosEntityState);

export const getSelectedTvVideosId = createSelector(
    getTvVideosEntityState,
    fromVideos.getSelectedId
);

export const getSelectedTvVideos = createSelector(
    getTvVideosEntities,
    getSelectedTvVideosId,
    ( entities, selectedTvId ) => {
        if (selectedTvId && entities[selectedTvId]) {
            return entities[selectedTvId].results;
        }
    }
);

export const getSelectedTvTrailer = createSelector(
    getSelectedTvVideos,
    ( videos ) => {
        if (videos && videos.length > 0) {
            return videos.find(( video ) => video.type === 'Trailer');
        }
    }
);

export const getSelectedTvTeaser = createSelector(
    getSelectedTvVideos,
    ( videos ) => {
        if (videos && videos.length > 0) {
            return videos.find(( video ) => video.type === 'Teaser');
        }
    }
);

export const getSelectedTvVideo = createSelector(
    getSelectedTvTrailer,
    getSelectedTvTeaser,
    ( trailer, teaser ) => trailer ? trailer : teaser
);
