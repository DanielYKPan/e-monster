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

    public getArtistDetails( id: string ): Observable<any> {

        // getting artist's details
        const detailsUrl = this.base_url + 'artists/' + id;

        // getting artist's albums and singles
        const relativeAlbumsUrl = this.base_url + 'artists/' + id + '/albums?market=US&include_groups=album,single';

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
                    albums: albums.items,
                    top_tracks: tracks.tracks
                };
            }),
            catchError(this.handleError),
        );
    }
}
