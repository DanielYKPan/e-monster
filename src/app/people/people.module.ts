import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { OwlTooltipModule } from 'owl-ng';

import { PeopleRoutingModule } from './people-routing.module';
import { ActorDetailsComponent } from './actor-details/actor-details.component';
import { PeopleComponent } from './people.component';
import { ShareModule } from '../share/share.module';
import { PeopleService } from './service/people.service';
import { ActorExistGuard } from './guards/actor-exist.guard';
import { reducers } from './reducers';
import { ActorDetailsHeaderComponent } from './actor-details/actor-details-header/actor-details-header.component';
import { ActorDetailsContentComponent } from './actor-details/actor-details-content/actor-details-content.component';

@NgModule({
    imports: [
        CommonModule,
        ShareModule,
        PeopleRoutingModule,

        // Owl NG
        OwlTooltipModule,

        StoreModule.forFeature('people', reducers)
    ],
    declarations: [
        ActorDetailsComponent,
        PeopleComponent,
        ActorDetailsHeaderComponent,
        ActorDetailsContentComponent
    ],
    providers: [
        PeopleService,
        ActorExistGuard
    ]
})
export class PeopleModule {
}
