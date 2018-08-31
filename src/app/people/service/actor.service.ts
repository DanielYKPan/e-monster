import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { IActor, IActorDetails } from '../../model';
import { TMDBService } from '../../tmdb';
import { PeopleModule } from '../people.module';

@Injectable({
    providedIn: PeopleModule
})
export class ActorService extends TMDBService {

    constructor( public http: HttpClient ) {
        super(http);
    }

    public getActorList( query: string, page: number = 1 ): Observable<IActor[]> {
        const url = this.base_url + `person/${query}`;

        return this.getResult(url, [{name: 'page', value: page.toString()}], true).pipe(
            map(( res: any ) => {
                return {...res, query: query};
            }),
            catchError(this.handleError)
        );
    }

    public searchActorDetails( id: number ): Observable<IActorDetails> {
        const url = this.base_url + `person/${id}`;

        const queries = [
            {name: 'language', value: 'en-US'},
            {name: 'append_to_response', value: 'movie_credits,tv_credits,external_ids'},
        ];

        return this.getResult(url, queries).pipe(
            map(( res: any ) => {
                return {...res};
            }),
            catchError(this.handleError)
        );
    }

    public searchActors( query: string, page: number ): Observable<IActor[]> {
        const url = this.base_url + 'search/person';

        const queries = [
            {name: 'page', value: page.toString()},
            {name: 'query', value: query},
        ];

        return this.getResult(url, queries, true).pipe(
            map(( res: any ) => {
                return {...res, query: query};
            }),
            catchError(this.handleError)
        );
    }
}
