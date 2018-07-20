/**
 * index
 */

import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBooks from './book';
import * as fromRoot from '../../reducers';

export interface BooksState {
    books: fromBooks.State;
}

export interface State extends fromRoot.State {
    books: BooksState;
}

export const reducers: ActionReducerMap<BooksState> = {
    books: fromBooks.reducer,
};

export const getBooksState = createFeatureSelector<BooksState>('books');

export const getBookEntityState = createSelector(
    getBooksState,
    ( state: BooksState ) => state.books
);

export const {
    selectIds: getBookIds,
    selectEntities: getBookEntities,
    selectAll: getAllBooks,
    selectTotal: getTotalBooks,
} = fromBooks.adapter.getSelectors(getBookEntityState);

export const getSelectedBookId = createSelector(
    getBookEntityState,
    fromBooks.getSelectedId,
);

export const getSelectedBook = createSelector(
    getBookEntities,
    getSelectedBookId,
    ( books, selectedIds ) => {
        return selectedIds && books[selectedIds];
    }
);
