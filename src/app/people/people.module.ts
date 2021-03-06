import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { OwlDialogModule, OwlTabsModule, OwlTooltipModule } from 'owl-ng';

import { PeopleRoutingModule } from './people-routing.module';
import { ActorDetailsComponent } from './actor-details/actor-details.component';
import { PeopleComponent } from './people.component';
import { ShareModule } from '../share/share.module';
import { ActorService } from './service/actor.service';
import { reducers } from './reducers';
import { CreditOverviewDialogComponent } from './actor-details/credit-overview-dialog/credit-overview-dialog.component';
import { SearchListComponent } from './search-list/search-list.component';
import { ArtistDetailsComponent } from './artist-details/artist-details.component';
import { ArtistService } from './service/artist.service';

@NgModule({
    imports: [
        CommonModule,
        ShareModule,
        PeopleRoutingModule,

        // Owl NG
        OwlTooltipModule,
        OwlTabsModule,
        OwlDialogModule,

        StoreModule.forFeature('people', reducers)
    ],
    declarations: [
        ActorDetailsComponent,
        PeopleComponent,
        CreditOverviewDialogComponent,
        SearchListComponent,
        ArtistDetailsComponent
    ],
    providers: [
        ActorService,
        ArtistService,
    ],
    entryComponents: [
        CreditOverviewDialogComponent
    ]
})
export class PeopleModule {
}
