import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AudioCardComponent } from './audio-card/audio-card.component';
import { LoaderComponent } from './loader/loader.component';
import { CreditsDialogComponent } from './credits-dialog/credits-dialog.component';
import { YearStringPipe } from './pipe/year-string.pipe';
import { SafePipe } from './pipe/safe.pipe';
import { ToDatePipe } from './pipe/date-string.pipe';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { VoteInformComponent } from './vote-inform/vote-inform.component';
import { RatingListComponent } from './rating-list/rating-list.component';
import { AudioDialogComponent } from './audio-dialog/audio-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        LazyLoadImageModule,
    ],
    exports: [
        LazyLoadImageModule,
        AudioCardComponent,
        LoaderComponent,
        YearStringPipe,
        SafePipe,
        ToDatePipe,
        CreditsDialogComponent,
        AudioDialogComponent,
        VoteInformComponent,
        RatingListComponent,
    ],
    declarations: [
        AudioCardComponent,
        LoaderComponent,
        YearStringPipe,
        SafePipe,
        ToDatePipe,
        CreditsDialogComponent,
        AudioDialogComponent,
        VoteInformComponent,
        RatingListComponent,
    ],
    entryComponents: [
        CreditsDialogComponent,
        AudioDialogComponent
    ]
})
export class ShareModule {
}
