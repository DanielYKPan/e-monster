import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { LoadingStart, SearchListComplete } from '../../search-store/actions';
import { MovieService } from '../service/movie.service';

@Injectable({
    providedIn: 'root'
})
export class SearchListExistGuard implements CanActivate {

    constructor( private store: Store<fromRoot.State>,
                 private movieService: MovieService ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {
        const page = next.params['page'] || 1;
        const query = next.params['query'] || 'now_playing';
        return this.hasSearchResults(query, page);
    }

    private hasSearchResults( query: string, page: number ): Observable<boolean> {
        return this.hasSearchResultsInStore(query, page).pipe(
            switchMap(( inStore: boolean ) => {
                if (inStore) {
                    return of(inStore);
                }

                return this.hasSearchResultsInApi(query, page);
            })
        );
    }

    private hasSearchResultsInStore( query: string, page: number ): Observable<boolean> {
        return forkJoin(
            this.store.pipe(select(fromRoot.getSearchType), take(1)),
            this.store.pipe(select(fromRoot.getSearchQuery), take(1)),
            this.store.pipe(select(fromRoot.getSearchPage), take(1)),
            this.store.pipe(select(fromRoot.getSearchResults), take(1)),
        ).pipe(
            map(( result: any ) => result[0] === 'movie' && result[1] === query && result[2] === page && !!result[3])
        );
    }

    private hasSearchResultsInApi( query: string, page: number ): Observable<boolean> {
        this.store.dispatch(new LoadingStart());

        const search = query === 'now_playing' ?
            this.movieService.searchList(query, page) :
            this.movieService.searchMovies(query, page);

        return search.pipe(
            map(res => new SearchListComplete(res)),
            tap(action => this.store.dispatch(action)),
            map(res => !!res.payload.results),
            catchError(() => {
                return of(false); // TODO: navigate to 404 page
            })
        );
    }
}
