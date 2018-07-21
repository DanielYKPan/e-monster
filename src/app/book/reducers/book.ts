/**
 * book
 */
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IBook } from '../../model';
import { BookActions, BookActionTypes } from '../actions/book';

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

export function reducer( state = initialState, action: BookActions ): State {
    switch (action.type) {

        case BookActionTypes.SearchCompleted:
            return adapter.addMany(action.payload, {
                ...state,
                selectedBookId: state.selectedBookId
            });

        case BookActionTypes.Load:
            return adapter.addOne(action.payload, {
                ...state,
                selectedBookId: state.selectedBookId
            });

        case BookActionTypes.Select:
            return {
                ...state,
                selectedBookId: action.payload,
            };

        default:
            return state;
    }
}

export const getSelectedId = ( state: State ) => state.selectedBookId;
