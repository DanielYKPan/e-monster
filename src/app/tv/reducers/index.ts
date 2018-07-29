/**
 * index
 */
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTvs from './tv';
import * as fromVideos from './video';
import * as fromSearch from './search';
import * as fromRoot from '../../reducers';

export interface TvsState {
    tvs: fromTvs.State;
    videos: fromVideos.State;
    search: fromSearch.State;
}

export interface State extends fromRoot.State {
    tvs: TvsState;
}

export const reducers: ActionReducerMap<TvsState> = {
    tvs: fromTvs.reducer,
    videos: fromVideos.reducer,
    search: fromSearch.reducer,
};

export const getTvsState = createFeatureSelector<TvsState>('tvs');

// TV Entity State
export const getTvEntityState = createSelector(
    getTvsState,
    ( state: TvsState ) => state.tvs
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

export const getSelectedSeasonNum = createSelector(
    getTvEntityState,
    fromTvs.getSelectedSeasonNum
);

export const getSelectedSeason = createSelector(
    getSelectedTv,
    getSelectedSeasonNum,
    ( entity, num ) => {
        return entity.seasons.find(s => +s.season_number === +num);
    }
);

// TV Videos State
export const getTvVideosEntityState = createSelector(
    getTvsState,
    ( state: TvsState ) => state.videos
);

export const {
    selectEntities: getTvVideosEntities,
} = fromVideos.adapter.getSelectors(getTvVideosEntityState);

export const getSearchTvVideoLoader = createSelector(
    getTvVideosEntityState,
    fromVideos.getLoading,
);

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

// Search Movie State
export const getSearchState = createSelector(
    getTvsState,
    ( state: TvsState ) => state.search
);

export const getSearchPage = createSelector(
    getSearchState,
    fromSearch.getPage,
);

export const getSearchTotalPage = createSelector(
    getSearchState,
    fromSearch.getTotalPage,
);

export const getSearchQuery = createSelector(
    getSearchState,
    fromSearch.getSearchQuery,
);

export const getSearchResults = createSelector(
    getSearchState,
    fromSearch.getSearchResults,
);

export const getSearchFeaturedList = createSelector(
    getSearchResults,
    ( results ) => {
        return results.slice(0, 2);
    }
);

export const getSearchNonFeaturedList = createSelector(
    getSearchResults,
    ( results ) => {
        return results.slice(2);
    }
);
