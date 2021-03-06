import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { OwlDialogService } from 'owl-ng';

import { IArtistDetails, ITrack } from '../../model';
import * as fromPeopleRoot from '../reducers';
import * as artistActions from '../actions/artist';
import { TrackDialogComponent } from '../../share/track-dialog/track-dialog.component';
import { AppService } from '../../app.service';

@Component({
    selector: 'app-artist-details',
    templateUrl: './artist-details.component.html',
    styleUrls: ['./artist-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistDetailsComponent implements OnInit, OnDestroy {

    public artist$: Observable<IArtistDetails>;

    private routeSub = Subscription.EMPTY;

    get scrollTarget(): HTMLElement {
        return this.appService.appContainer;
    }

    constructor( private store: Store<fromPeopleRoot.State>,
                 private route: ActivatedRoute,
                 private router: Router,
                 private appService: AppService,
                 private dialogService: OwlDialogService ) {
    }

    public ngOnInit() {
        this.routeSub = this.route.params
            .pipe(map(params => new artistActions.Select(params.id)))
            .subscribe(action => this.store.dispatch(action));

        this.artist$ = this.store.pipe(select(fromPeopleRoot.getSelectedArtist));
    }

    public ngOnDestroy(): void {
        this.routeSub.unsubscribe();
    }

    public handleClickOnTrack(track: ITrack, event: any): void {
        const dialogRef = this.dialogService.open(TrackDialogComponent, {
            data: {
                albumName: track.album.name,
                trackName: track.name,
                artists: track.artists,
                spotifyUrl: track.external_urls.spotify,
            },
            dialogClass: 'audio-dialog',
            transitionX: event.clientX,
            transitionY: event.clientY,
        });
        event.preventDefault();
    }

    /**
     * Handle select album action
     * */
    public handleSelectAlbum( albumId: string ) {
        this.router.navigate(['music/album', albumId]);
    }
}
