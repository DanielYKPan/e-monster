/**
 * tmdb
 */
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export abstract class TMDBService {

    protected readonly apikey = '0ea0b3ae1ad79cc9e6354410580840c3';

    protected readonly region = 'US';

    protected readonly base_url = 'https://api.themoviedb.org/3/';

    protected constructor( public http: HttpClient ) {
    }

    protected getResult( url: string, queries?: Array<{ name: string, value: string }>, setRegion?: boolean ): Observable<any> {
        let params = new HttpParams();

        if (queries) {
            for (const query of queries) {
                params = params.set(query.name, query.value);
            }
        }

        if (setRegion) {
            params = params.set('region', this.region);
        }

        params = params.set('api_key', this.apikey);

        return this.http.get(url, {params: params});
    }

    protected handleError( error: HttpErrorResponse ) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error.status_message}`);
        }
        return throwError(error);
    }
}
