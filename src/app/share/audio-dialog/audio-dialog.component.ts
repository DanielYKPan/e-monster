/**
 * audio-dialog.component
 */

import { AfterContentInit, ChangeDetectionStrategy, Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { IVideo } from '../../model';
import { OWL_DIALOG_DATA, OwlDialogRef } from 'owl-ng';

@Component({
    selector: 'app-audio-dialog-component',
    styleUrls: ['./audio-dialog.component.scss'],
    templateUrl: './audio-dialog.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AudioDialogComponent implements OnInit, AfterContentInit {

    public title: string;

    public videoKey: string;

    public video$: Observable<IVideo>;

    public showLoader$: Observable<boolean>;

    constructor( public dialogRef: OwlDialogRef<AudioDialogComponent>,
                 @Inject(OWL_DIALOG_DATA) public data: any ) {
    }

    public ngOnInit() {
    }

    public ngAfterContentInit(): void {
        this.title = this.data.title;
        this.showLoader$ = this.data.showLoader$;

        if (this.data.video$) {
            this.video$ = this.data.video$;
        } else if (this.data.videoKey) {
            this.videoKey = this.data.videoKey;
        }
    }

    public closeDialog( event: any ): void {
        this.dialogRef.close();
        event.preventDefault();
    }
}
