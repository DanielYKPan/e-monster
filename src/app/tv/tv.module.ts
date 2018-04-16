import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TvRoutingModule } from './tv-routing.module';
import { TvComponent } from './tv.component';
import { TvListComponent } from './tv-list/tv-list.component';
import { ShareModule } from '../share/share.module';
import { TvService } from './service/tv.service';

@NgModule({
    imports: [
        CommonModule,
        ShareModule,
        TvRoutingModule
    ],
    declarations: [
        TvComponent,
        TvListComponent
    ],
    providers: [
        TvService,
    ]
})
export class TvModule {
}
