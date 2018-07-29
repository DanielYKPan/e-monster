/**
 * spotify
 */
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs/index';

export abstract class SpotifyService {

    protected readonly base_url = 'https://api.spotify.com/v1/';

    protected readonly limit = 20; // The maximum number of items in the response

    private _spotify_access_token: string;
    get spotify_access_token(): string {
        return this._spotify_access_token;
    }

    set spotify_access_token( token: string ) {
        this._spotify_access_token = token;
        localStorage.setItem('spotify_access_token', token);
    }

    protected constructor( public http: HttpClient ) {
        this._spotify_access_token = localStorage.getItem('spotify_access_token');
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
