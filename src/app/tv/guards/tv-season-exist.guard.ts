import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { forkJoin, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import * as fromTvRoot from '../reducers';
import * as tvActions from '../actions/tv';
import * as tvVideoActions from '../actions/video';
import * as searchActions from '../../search-store/actions';
import { TvService } from '../service/tv.service';
import { ITv } from '../../model';

@Injectable({
    providedIn: 'root'
})
export class TvSeasonExistGuard implements CanActivate {

    constructor( private store: Store<fromTvRoot.State>,
                 private tvService: TvService,
                 private router: Router ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {
        const tv_id = +next.paramMap.get('id');
        const season_number = +next.paramMap.get('number');
        return this.hasTvSeason(tv_id, season_number);
    }

    private hasTvSeason( tv_id: number, season_number: number ): Observable<boolean> {
        return this.getTvInStore(tv_id).pipe(
            switchMap(tvEntity => {
                if (tvEntity) {
                    const season = tvEntity.seasons.find(s => +s.season_number === +season_number);
                    this.store.dispatch(new tvVideoActions.SearchTvSeasonVideos({
                        tv_id,
                        season_number,
                        season_id: season.id
                    }));
                    if (!!season._id) {
                        return of(true);
                    } else {
                        return this.hasTvSeasonDetailsInApi(tvEntity, season_number);
                    }
                } else {
                    return this.hasTvAndTvSeasonInApi(tv_id, season_number);
                }
            })
        );
    }

    private hasTvSeasonDetailsInApi( tv: ITv, season_number: number ): Observable<boolean> {
        this.store.dispatch(new searchActions.LoadingStart());
        return this.tvService.getTvSeason(tv.id, season_number).pipe(
            map(seasonDetails => {
                const new_seasons = tv.seasons.map(s => +s.id === +seasonDetails.id ? seasonDetails : s);
                this.store.dispatch(new tvActions.UpdateTV({tv: {id: tv.id, changes: {seasons: new_seasons}}}));
                this.store.dispatch(new searchActions.LoadingCompleted());
                return !!seasonDetails;
            }),
            catchError(() => {
                this.router.navigate(['page-not-found'], {skipLocationChange: true});
                return of(false);
            })
        );
    }

    private getTvInStore( tv_id: number ): Observable<ITv> {
        return this.store.pipe(
            select(fromTvRoot.getTvEntities),
            map(entities => entities[tv_id])
        );
    }

    private hasTvAndTvSeasonInApi( tv_id: number, season_number: number ): Observable<boolean> {
        this.store.dispatch(new searchActions.LoadingStart());
        const tv$ = this.tvService.getTv(tv_id);
        const season$ = this.tvService.getTvSeason(tv_id, season_number);

        return forkJoin(tv$, season$).pipe(
            map(results => {
                const tv = results[0];
                const season = results[1];
                if (tv.id !== tv_id) {
                    throwError('Entity not exists');
                    return false;
                }

                tv.seasons = tv.seasons.map(s => +s.id === +season.id ? season : s);
                this.store.dispatch(new tvVideoActions.SearchTvSeasonVideos({
                    tv_id,
                    season_number,
                    season_id: season.id
                }));
                this.store.dispatch(new searchActions.LoadingCompleted());
                this.store.dispatch(new tvActions.Load(tv));
                this.store.dispatch(new searchActions.SetSearchType('tv'));
                return !!tv;
            }),
            catchError(() => {
                this.router.navigate(['page-not-found'], {skipLocationChange: true});
                return of(false);
            })
        );
    }
}
