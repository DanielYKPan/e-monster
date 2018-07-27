import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MusicService } from './service/music.service';
import { Observable } from 'rxjs/Observable';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as fromMusicRoot from './reducers';
import { IAlbum } from '../model';

@Component({
    selector: 'app-music',
    templateUrl: './music.component.html',
    styleUrls: ['./music.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MusicComponent implements OnInit {

    public showLoader$: Observable<boolean>;

    public list$: Observable<IAlbum[]>;

    constructor( private http: HttpClient,
                 private store: Store<fromMusicRoot.State>,
                 private musicService: MusicService,
                 @Inject(DOCUMENT) private document: any ) {
    }

    ngOnInit() {
        this.showLoader$ = this.store.pipe(select(fromRoot.getSearchMusicTypeLoader));
        this.list$ = this.store.pipe(select(fromRoot.getSearchResults));
    }

    public onDeactivate() {
        window.scrollTo(0, 0);
    }

    public testMusic() {
        /*const url = 'https://accounts.spotify.com/api/token';

        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Basic ' + btoa('ce67a8a0eb964933a536cca6ffc81848:c6963970c8494b5680afc3a64f9d1143'));
        headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');

        this.http.post(url, 'grant_type=client_credentials', {headers})
            .subscribe(( res ) => {
                console.log(res);
            });*/

        this.musicService.getCategories().subscribe((r) => {
            console.log(r);
        });
    }
}
