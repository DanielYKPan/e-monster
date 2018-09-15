/**
 * album
 */
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IAlbum } from '../../model';
import { MusicActions, MusicActionTypes } from '../actions/music';
import { SearchMusicActions, SearchMusicActionTypes } from '../actions/search';
import { CollectionActions, CollectionActionTypes } from '../actions/collection';

export interface State extends EntityState<IAlbum> {
    selectedAlbumId: string | null;
    accessToken: string | null;
}

export const adapter: EntityAdapter<IAlbum> = createEntityAdapter<IAlbum>({
    selectId: album => album.id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
    selectedAlbumId: null,
    accessToken: null,
});

export function reducer( state = initialState, action: MusicActions | SearchMusicActions | CollectionActions ): State {
    switch (action.type) {

        case CollectionActionTypes.LoadSuccess:
            return adapter.addMany(action.payload.entities, {
                ...state,
                electedAlbumId: state.selectedAlbumId
            });

        case SearchMusicActionTypes.SearchAlbumComplete:
            return adapter.addMany(action.payload.search.results, {
                ...state,
                selectedAlbumId: state.selectedAlbumId
            });

        case MusicActionTypes.Load:
            return adapter.upsertOne(action.payload.entity, {
                ...state,
                selectedAlbumId: state.selectedAlbumId,
                accessToken: state.accessToken,
            });

        case MusicActionTypes.Select:
            return {
                ...state,
                selectedAlbumId: action.payload.id
            };

        case MusicActionTypes.SetToken:
            return {
                ...state,
                accessToken: action.payload.token
            };

        default:
            return state;
    }
}

export const getSelectedId = ( state: State ) => state.selectedAlbumId;
export const getAccessToken = ( state: State ) => state.accessToken;

