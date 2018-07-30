import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SpotifyService } from '../../spotify';

@Injectable({
    providedIn: 'root'
})
export class MusicService extends SpotifyService {

    constructor( public http: HttpClient ) {
        super(http);
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

    public getNewReleases( page: number = 1 ): Observable<any> {
        const offSet = (page - 1) * this.limit;
        const url = this.base_url + 'browse/new-releases?offset=' + offSet;
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + this.spotify_access_token);
        return this.http.get(url, {headers}).pipe(
            map(( res: any ) => {
                const total_results = res.albums.total;
                const total_pages = total_results / this.limit;
                return {
                    query: 'new-releases',
                    page: page,
                    total_results,
                    total_pages,
                    results: res.albums.items || null
                };
            }),
            catchError(this.handleError)
        );
    }

    public getAlbum( id: string ): Observable<any> {
        const url = this.base_url + 'albums/' + id;
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + this.spotify_access_token);
        return this.http.get(url, {headers}).pipe(
            catchError(this.handleError)
        );
    }

    /**
     * Search both album and track
     * */
    public searchMusic( query: string, page: number = 1 ): Observable<any> {
        const offSet = (page - 1) * this.limit;
        const url = this.base_url + 'search?type=album,track&market=US&offset=' + offSet + '&q=' + query;
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + this.spotify_access_token);
        return this.http.get(url, {headers}).pipe(
            map((res: any) => {
                const total_results_album = res.albums.total;
                const total_pages_album = total_results_album / this.limit;
                const total_results_track = res.tracks.total;
                const total_pages_track = total_results_track / this.limit;

                return {
                    albums: {
                        query,
                        page,
                        total_results: total_results_album,
                        total_pages: total_pages_album,
                        results: res.albums.items || null
                    },
                    tracks: {
                        query,
                        page,
                        total_results: total_results_track,
                        total_pages: total_pages_track,
                        results: res.tracks.items || null
                    }
                };
            }),
            catchError(this.handleError)
        );
    }

    /**
     * Search only album
     * */
    public searchAlbum( query: string, page: number = 1 ): Observable<any> {
        const offSet = (page - 1) * this.limit;
        const url = this.base_url + 'search?type=album&market=US&offset=' + offSet + '&q=' + query;
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + this.spotify_access_token);
        return this.http.get(url, {headers}).pipe(
            map(( res: any ) => {
                const total_results = res.albums.total;
                const total_pages = total_results / this.limit;
                return {
                    query,
                    page,
                    total_results,
                    total_pages,
                    results: res.albums.items || null
                };
            }),
            catchError(this.handleError)
        );
    }

    /**
     * Search only track
     * */
    public searchTrack( query: string, page: number = 1 ): Observable<any> {
        const offSet = (page - 1) * this.limit;
        const url = this.base_url + 'search?type=track&market=US&offset=' + offSet + '&q=' + query;
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + this.spotify_access_token);
        return this.http.get(url, {headers}).pipe(
            map(( res: any ) => {
                const total_results = res.tracks.total;
                const total_pages = total_results / this.limit;
                return {
                    query,
                    page,
                    total_results,
                    total_pages,
                    results: res.tracks.items || null
                };
            }),
            catchError(this.handleError)
        );
    }

    public getCategories(): Observable<any> {
        const url = this.base_url + 'browse/categories';
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + this.spotify_access_token);
        return this.http.get(url, {headers}).pipe(
            map(( r: any ) => r.categories),
            catchError(this.handleError)
        );
    }
}
