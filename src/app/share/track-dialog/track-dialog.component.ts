import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { OWL_DIALOG_DATA, OwlDialogRef } from 'owl-ng';
import { IArtistDetails } from '../../model';

@Component({
    selector: 'app-track-dialog',
    templateUrl: './track-dialog.component.html',
    styleUrls: ['./track-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrackDialogComponent implements OnInit {

    public trackName: string;
    public albumName: string;
    public artists: IArtistDetails[];
    public spotifyUrl: string;

    constructor( @Inject(OWL_DIALOG_DATA) public data: any,
                 public dialogRef: OwlDialogRef<TrackDialogComponent> ) {
    }

    public ngOnInit() {
        this.trackName = this.data.trackName;
        this.albumName = this.data.albumName;
        this.artists = this.data.artists;
        this.spotifyUrl = this.data.spotifyUrl;
    }

    public closeDialog(): void {
        this.dialogRef.close();
    }
}
