/**
 * album
 */
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IAlbum } from '../../model';
import { MusicActions, MusicActionTypes } from '../actions/music';

export interface State extends EntityState<IAlbum> {
    selectedAlbumId: number | null;
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

export function reducer( state = initialState, action: MusicActions ): State {
    switch (action.type) {

        case MusicActionTypes.SearchListCompleted:
            return adapter.addMany(action.payload, {
                ...state,
                selectedAlbumId: state.selectedAlbumId
            });

        case MusicActionTypes.Load:
            return adapter.upsertOne(action.payload, {
                ...state,
                selectedAlbumId: state.selectedAlbumId,
                accessToken: state.accessToken,
            });

        case MusicActionTypes.Select:
            return {
                ...state,
                selectedAlbumId: action.payload
            };

        case MusicActionTypes.SetToken:
            return {
                ...state,
                accessToken: action.payload
            };

        default:
            return state;
    }
}

export const getSelectedId = ( state: State ) => state.selectedAlbumId;
export const getAccessToken = ( state: State ) => state.accessToken;

