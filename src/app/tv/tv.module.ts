import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { OwlChipsModule, OwlDialogModule, OwlMenuModule, OwlTooltipModule } from 'owl-ng';

import { TvRoutingModule } from './tv-routing.module';
import { TvComponent } from './tv.component';
import { TvListComponent } from './tv-list/tv-list.component';
import { ShareModule } from '../share/share.module';
import { TvService } from './service/tv.service';
import { reducers } from './reducers';
import { TvEffect } from './effects/tv';
import { TvDetailsComponent } from './tv-details/tv-details.component';
import { TvDetailsHeaderComponent } from './tv-details/tv-details-header/tv-details-header.component';
import { TvDetailsContentComponent } from './tv-details/tv-details-content/tv-details-content.component';
import { TvSeasonDetailsComponent } from './tv-season-details/tv-season-details.component';
import { TvSeasonDetailsHeaderComponent } from './tv-season-details/tv-season-details-header/tv-season-details-header.component';
import { TvSeasonDetailsContentComponent } from './tv-season-details/tv-season-details-content/tv-season-details-content.component';
import { VideoEffect } from './effects/video';
import { SearchListComponent } from './search-list/search-list.component';

@NgModule({
    imports: [
        CommonModule,
        ShareModule,
        TvRoutingModule,

        OwlDialogModule,
        OwlMenuModule,
        OwlTooltipModule,
        OwlChipsModule,

        StoreModule.forFeature('tvs', reducers),
        EffectsModule.forFeature([TvEffect, VideoEffect])
    ],
    declarations: [
        TvComponent,
        TvListComponent,
        TvDetailsComponent,
        TvDetailsHeaderComponent,
        TvDetailsContentComponent,
        TvSeasonDetailsComponent,
        TvSeasonDetailsHeaderComponent,
        TvSeasonDetailsContentComponent,
        SearchListComponent
    ],
    providers: [
        TvService,
    ]
})
export class TvModule {
}
