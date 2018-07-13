/**
 * tv-season.resolver
 */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ISeason } from '../../model';
import { Observable } from 'rxjs/Observable';
import { TvService } from '../service/tv.service';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import * as fromTvRoot from '../reducers';
import { Store } from '@ngrx/store';
import { LoadingCompleted, LoadingStart } from '../../search-store/actions';
import { Select } from '../actions/tv';
import { SearchTvSeasonVideos } from '../actions/video';

@Injectable()
export class TvSeasonResolver implements Resolve<ISeason> {

    constructor( private tvService: TvService,
                 private store: Store<fromTvRoot.State> ) {
    }

    public resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<ISeason> | Promise<ISeason> | ISeason {
        const tv_id = +route.paramMap.get('id');
        const season_number = +route.paramMap.get('number');
        this.store.dispatch(new LoadingStart());
        return this.tvService.getTvSeason(tv_id, season_number)
            .pipe(
                tap(() => this.store.dispatch(new LoadingCompleted())),
                map(( season ) => {
                    if (season) {
                        this.store.dispatch(new Select(tv_id));
                        this.store.dispatch(new SearchTvSeasonVideos({tv_id, season_number, season_id: season.id}));
                        return season;
                    } else {
                        // TODO: navigate to 404
                        return null;
                    }
                }),
                catchError(() => {
                    // TODO: navigate to 404
                    return of(null);
                })
            );
    }
}
