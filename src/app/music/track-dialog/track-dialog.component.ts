import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { OWL_DIALOG_DATA, OwlDialogRef } from 'owl-ng';

@Component({
    selector: 'app-track-dialog',
    templateUrl: './track-dialog.component.html',
    styleUrls: ['./track-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrackDialogComponent implements OnInit {

    public track: any;

    public albumName: string;

    constructor( @Inject(OWL_DIALOG_DATA) public data: any,
                 public dialogRef: OwlDialogRef<TrackDialogComponent> ) {
    }

    public ngOnInit() {
        this.track = this.data.track;
        this.albumName = this.data.albumName;
    }

    public closeDialog(): void {
        this.dialogRef.close();
    }
}
