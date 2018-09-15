/**
 * book
 */
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IBook } from '../../model';
import { BookActions, BookActionTypes } from '../actions/book';
import { SearchBookActions, SearchBookActionTypes } from '../actions/search';
import { CollectionActions, CollectionActionTypes } from '../actions/collection';

export interface State extends EntityState<IBook> {
    selectedBookId: string | null;
}

export const adapter: EntityAdapter<IBook> = createEntityAdapter<IBook>({
    selectId: book => book.id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
    selectedBookId: null,
});

export function reducer( state = initialState, action: BookActions | SearchBookActions | CollectionActions ): State {
    switch (action.type) {

        case CollectionActionTypes.LoadSuccess:
            return adapter.addMany(action.payload.entities, {
                ...state,
                selectedBookId: state.selectedBookId
            });

        case SearchBookActionTypes.SearchComplete:
            return adapter.addMany(action.payload.search.results, {
                ...state,
                selectedBookId: state.selectedBookId
            });

        case BookActionTypes.Load:
            return adapter.addOne(action.payload.entity, {
                ...state,
                selectedBookId: state.selectedBookId
            });

        case BookActionTypes.Select:
            return {
                ...state,
                selectedBookId: action.payload.id,
            };

        default:
            return state;
    }
}

export const getSelectedId = ( state: State ) => state.selectedBookId;
