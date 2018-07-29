import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { OwlDialogService } from 'owl-ng';

import { IAlbum } from '../../model';
import * as fromMusicRoot from '../reducers';
import * as musicActions from '../actions/music';
import { TrackDialogComponent } from '../track-dialog/track-dialog.component';


@Component({
    selector: 'app-album-details',
    templateUrl: './album-details.component.html',
    styleUrls: ['./album-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumDetailsComponent implements OnInit, OnDestroy {

    public album$: Observable<IAlbum>;

    private routeSub = Subscription.EMPTY;

    constructor( private route: ActivatedRoute,
                 private store: Store<fromMusicRoot.State>,
                 private dialogService: OwlDialogService ) {
    }

    public ngOnInit() {
        this.routeSub = this.route.params
            .pipe(map(params => new musicActions.Select(params.id)))
            .subscribe(action => this.store.dispatch(action));

        this.album$ = this.store.pipe(select(fromMusicRoot.getSelectedAlbum));
    }

    public ngOnDestroy(): void {
        this.routeSub.unsubscribe();
    }

    public handleClickOnTrack( track: any, albumName: string, event: any ): any {
        const dialogRef = this.dialogService.open(TrackDialogComponent, {
            data: {track, albumName},
            dialogClass: 'audio-dialog',
            transitionX: event.clientX,
            transitionY: event.clientY,
        });
        event.preventDefault();
    }
}
