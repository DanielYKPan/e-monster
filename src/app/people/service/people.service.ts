import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';

import { IActorDetails } from '../../model';
import { TMDBService } from '../../tmdb';

@Injectable({
    providedIn: 'root'
})
export class PeopleService extends TMDBService {

    constructor( public http: HttpClient ) {
        super(http);
    }

    public searchActorDetails( id: number ): Observable<IActorDetails> {
        const url = this.base_url + `person/${id}`;

        const queries = [
            {name: 'language', value: 'en-US'},
            {name: 'append_to_response', value: 'movie_credits,tv_credits,external_ids'},
        ];

        return this.getResult(url, queries).pipe(
            map(( res: any ) => {
                return {...res, type: 'people'};
            }),
            catchError(this.handleError)
        );
    }
}
