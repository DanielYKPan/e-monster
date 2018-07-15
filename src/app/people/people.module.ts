import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeopleRoutingModule } from './people-routing.module';
import { ActorDetailsComponent } from './actor-details/actor-details.component';
import { PeopleComponent } from './people.component';
import { ShareModule } from '../share/share.module';

@NgModule({
    imports: [
        CommonModule,
        ShareModule,
        PeopleRoutingModule
    ],
    declarations: [ActorDetailsComponent, PeopleComponent]
})
export class PeopleModule {
}
