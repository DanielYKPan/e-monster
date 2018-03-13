/**
 * reducers
 */

import * as fromSearch from './search-reducer';
import * as fromBooks from './book-reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface BooksState {
    search: fromSearch.State;
    books: fromBooks.State;
}

export interface State {
    books: BooksState;
}

export const reducers = {
    search: fromSearch.reducer,
    books: fromBooks.reducer,
};

export const getBooksState = createFeatureSelector<BooksState>('books');

export const getSearchState = createSelector(
    getBooksState,
    ( state: BooksState ) => state.search
);

export const getSearchBookIds = createSelector(
    getSearchState,
    fromSearch.getIds
);

export const getSearchQuery = createSelector(
    getSearchState,
    fromSearch.getQuery
);

export const getSearchLoading = createSelector(
    getSearchState,
    fromSearch.getLoading
);

export const getSearchError = createSelector(
    getSearchState,
    fromSearch.getError
);

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

export const getSearchResults = createSelector(
    getBookEntities,
    getSearchBookIds,
    ( books, searchIds ) => {
        return searchIds.map(id => books[id]);
    }
);

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
