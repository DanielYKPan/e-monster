import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioCardComponent } from './audio-card/audio-card.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { YearStringPipe } from './pipe/year-string.pipe';
import { VotePercentagePipe } from './pipe/vote-percentage.pipe';

@NgModule({
    imports: [
        CommonModule,
        LazyLoadImageModule,
    ],
    exports: [
        LazyLoadImageModule,
        AudioCardComponent,
        YearStringPipe,
        VotePercentagePipe,
    ],
    declarations: [
        AudioCardComponent,
        YearStringPipe,
        VotePercentagePipe,
    ]
})
export class ShareModule {
}
