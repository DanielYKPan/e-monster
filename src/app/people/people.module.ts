import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { OwlDialogModule, OwlTabsModule, OwlTooltipModule } from 'owl-ng';

import { PeopleRoutingModule } from './people-routing.module';
import { ActorDetailsComponent } from './actor-details/actor-details.component';
import { PeopleComponent } from './people.component';
import { ShareModule } from '../share/share.module';
import { PeopleService } from './service/people.service';
import { ActorExistGuard } from './guards/actor-exist.guard';
import { reducers } from './reducers';
import { ActorDetailsHeaderComponent } from './actor-details/actor-details-header/actor-details-header.component';
import { ActorDetailsContentComponent } from './actor-details/actor-details-content/actor-details-content.component';
import { CreditOverviewDialogComponent } from './actor-details/credit-overview-dialog/credit-overview-dialog.component';

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
        ActorDetailsHeaderComponent,
        ActorDetailsContentComponent,
        CreditOverviewDialogComponent
    ],
    providers: [
        PeopleService,
        ActorExistGuard
    ],
    entryComponents: [
        CreditOverviewDialogComponent
    ]
})
export class PeopleModule {
}
