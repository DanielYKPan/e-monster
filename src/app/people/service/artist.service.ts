import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { SpotifyService } from '../../spotify';

@Injectable({
    providedIn: 'root'
})
export class ArtistService extends SpotifyService {

    constructor( public http: HttpClient ) {
        super(http);
    }

    public searchArtist( query: string, page: number ): Observable<any> {
        const offSet = (page - 1) * this.limit;
        const url = this.base_url + 'search?type=artist&market=US&offset=' + offSet + '&q=' + query;
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + this.spotify_access_token);
        return this.http.get(url, {headers}).pipe(
            map(( res: any ) => {
                const total_results = res.artists.total;
                const total_pages = total_results / this.limit;
                return {
                    query,
                    page,
                    total_results,
                    total_pages,
                    results: res.artists.items || []
                };
            }),
            catchError(this.handleError),
        );
    }

    public getArtistDetails( id: string ): Observable<any> {

        // getting artist's details
        const detailsUrl = this.base_url + 'artists/' + id;

        // getting artist's albums and singles
        const relativeAlbumsUrl = this.base_url + 'artists/' + id + '/albums?limit=50&market=US&include_groups=album,single';

        // getting artist's top tracks
        const topTracksUrl = this.base_url + 'artists/' + id + '/top-tracks?country=US';

        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + this.spotify_access_token);

        return forkJoin(
            this.http.get(detailsUrl, {headers}),
            this.http.get(relativeAlbumsUrl, {headers}),
            this.http.get(topTracksUrl, {headers})
        ).pipe(
            map(( [artist, albums, tracks]: any[] ) => {
                return {
                    ...artist,
                    albums: albums.items.filter(( a ) => a.album_type === 'album'),
                    singles: albums.items.filter(( a ) => a.album_type === 'single'),
                    top_tracks: tracks.tracks
                };
            }),
            catchError(this.handleError),
        );
    }
}
