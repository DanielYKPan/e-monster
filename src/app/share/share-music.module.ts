/**
 * share-music.module
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackDialogComponent } from './track-dialog/track-dialog.component';
import { TrackBarComponent } from './track-bar/track-bar.component';
import { MillisToMsPipe } from './pipe/millis-to-ms.pipe';
import { ShareModule } from './share.module';

@NgModule({
    imports: [
        CommonModule,
        ShareModule,
    ],
    exports: [
        TrackDialogComponent,
        TrackBarComponent,
    ],
    declarations: [
        TrackDialogComponent,
        TrackBarComponent,
        MillisToMsPipe,
    ],
    entryComponents: [
        TrackDialogComponent,
    ]
})
export class ShareMusicModule {
}
