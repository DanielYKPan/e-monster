import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';
import { IAlbum } from '../../model';

@Injectable({
    providedIn: 'root'
})
export class MusicService {

    protected readonly base_url = 'https://api.spotify.com/v1/';

    private readonly limit = 20; // The maximum number of items in the response

    private _spotify_access_token: string;
    get spotify_access_token(): string {
        return this._spotify_access_token || localStorage.getItem('spotify_access_token');
    }

    set spotify_access_token( token: string ) {
        this._spotify_access_token = token;
        localStorage.setItem('spotify_access_token', token);
    }

    constructor( private http: HttpClient ) {
    }

    /*public getAccessToken(): Observable<string> {
        const url = 'https://accounts.spotify.com/api/token';

        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Basic ' + btoa('ce67a8a0eb964933a536cca6ffc81848:c6963970c8494b5680afc3a64f9d1143'));
        headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post(url, 'grant_type=client_credentials', {headers}).pipe(
            map((res: any) => res.access_token),
            catchError(this.handleError)
        );
    }*/

    public getNewReleases( page: number = 1 ): Observable<IAlbum[]> {
        const offSet = (page - 1) * this.limit;
        const url = this.base_url + 'browse/new-releases?offset=' + offSet;
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + this._spotify_access_token);
        return this.http.get(url, {headers}).pipe(
            map(( r: any ) => r.items),
            catchError(this.handleError)
        );
    }

    public getCategories(): Observable<any> {
        const url = this.base_url + 'browse/categories';
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + this._spotify_access_token);
        return this.http.get(url, {headers}).pipe(
            map(( r: any ) => r.categories),
            catchError(this.handleError)
        );
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
        // return an ErrorObservable with a user-facing error message
        return new ErrorObservable(error.error.status_message);
    }
}
