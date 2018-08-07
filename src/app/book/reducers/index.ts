/**
 * index
 */

import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBooks from './book';
import * as fromCollection from './collection';
import * as fromCoreRoot from '../../core/reducers';
import * as fromSearch from './search';

export interface BooksState {
    books: fromBooks.State;
    search: fromSearch.State;
    collection: fromCollection.State;
}

export interface State extends fromCoreRoot.State {
    books: BooksState;
}

export const reducers: ActionReducerMap<BooksState> = {
    books: fromBooks.reducer,
    search: fromSearch.reducer,
    collection: fromCollection.reducer,
};

export const getBooksState = createFeatureSelector<BooksState>('books');

// Book Entity State
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

// Search Book State
export const getSearchState = createSelector(
    getBooksState,
    ( state: BooksState ) => state.search
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

export const getPaginatorData = createSelector(
    getSearchPage,
    getSearchTotalPage,
    getSearchQuery,
    ( page, total_pages, query ) => {
        return {page, total_pages, query};
    }
);

// collection
export const getCollectionState = createSelector(
    getBooksState,
    ( state: BooksState ) => state.collection
);

export const getCollectionBookIds = createSelector(
    getCollectionState,
    fromCollection.getIds,
);

export const getBookCollection = createSelector(
    getBookEntities,
    getCollectionBookIds,
    ( entities, ids ) => {
        return ids.map(id => entities[id]);
    }
);

export const isSelectedBookInCollection = createSelector(
    getCollectionBookIds,
    getSelectedBookId,
    ( ids, selected ) => {
        return ids.indexOf(selected) > -1;
    }
);
