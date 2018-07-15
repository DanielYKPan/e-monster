import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeopleRoutingModule } from './people-routing.module';
import { ActorDetailsComponent } from './actor-details/actor-details.component';
import { PeopleComponent } from './people.component';
import { ShareModule } from '../share/share.module';
import { PeopleService } from './service/people.service';
import { ActorExistGuard } from './guards/actor-exist.guard';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { ActorDetailsHeaderComponent } from './actor-details/actor-details-header/actor-details-header.component';

@NgModule({
    imports: [
        CommonModule,
        ShareModule,
        PeopleRoutingModule,

        StoreModule.forFeature('people', reducers)
    ],
    declarations: [
        ActorDetailsComponent,
        PeopleComponent,
        ActorDetailsHeaderComponent
    ],
    providers: [
        PeopleService,
        ActorExistGuard
    ]
})
export class PeopleModule {
}
