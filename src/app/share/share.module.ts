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
import { ListPaginatorComponent } from './list-paginator/list-paginator.component';
import { FrameSidenavComponent } from './frame-sidenav/frame-sidenav.component';
import { FrameMainComponent } from './frame-main/frame-main.component';
import { OwlMenuModule } from 'owl-ng';
import { SearchListSidenavComponent } from './search-list-sidenav/search-list-sidenav.component';
import { AddCommasPipe } from './pipe/add-commas.pipe';
import { EllipsisPipe } from './pipe/ellipsis.pipe';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        LazyLoadImageModule,

        // Owl NG
        OwlMenuModule,
    ],
    exports: [
        LazyLoadImageModule,
        AudioCardComponent,
        LoaderComponent,
        YearStringPipe,
        SafePipe,
        ToDatePipe,
        AddCommasPipe,
        EllipsisPipe,
        CreditsDialogComponent,
        AudioDialogComponent,
        VoteInformComponent,
        RatingListComponent,
        ListPaginatorComponent,
        FrameSidenavComponent,
        FrameMainComponent,
        SearchListSidenavComponent,
    ],
    declarations: [
        AudioCardComponent,
        LoaderComponent,
        YearStringPipe,
        SafePipe,
        ToDatePipe,
        AddCommasPipe,
        EllipsisPipe,
        CreditsDialogComponent,
        AudioDialogComponent,
        VoteInformComponent,
        RatingListComponent,
        ListPaginatorComponent,
        FrameSidenavComponent,
        FrameMainComponent,
        SearchListSidenavComponent,
    ],
    entryComponents: [
        CreditsDialogComponent,
        AudioDialogComponent,
    ]
})
export class ShareModule {
}
