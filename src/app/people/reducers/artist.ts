/**
 * artist
 */
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IArtistDetails } from '../../model';
import { ArtistActions, ArtistActionTypes } from '../actions/artist';

export interface State extends EntityState<IArtistDetails> {
    selectedArtistId: string | null;
}

export const adapter: EntityAdapter<IArtistDetails> = createEntityAdapter<IArtistDetails>({
    selectId: artist => artist.id,
    sortComparer: false
});

export const initialState: State = adapter.getInitialState({
    selectedArtistId: null,
});

export function reducer( state = initialState, action: ArtistActions ): State {
    switch (action.type) {
        case ArtistActionTypes.Load:
            return adapter.addOne(action.payload, {
                ...state,
                selectedArtistId: state.selectedArtistId
            });

        case ArtistActionTypes.Select:
            return {
                ...state,
                selectedArtistId: action.payload,
            };

        default:
            return state;
    }
}

export const getSelectedId = ( state: State ) => state.selectedArtistId;
