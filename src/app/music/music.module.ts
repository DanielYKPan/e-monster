import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MusicRoutingModule } from './music-routing.module';
import { MusicComponent } from './music.component';
import { MusicListComponent } from './music-list/music-list.component';
import { ShareModule } from '../share/share.module';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { MillisToMsPipe } from './pipes/millis-to-ms.pipe';

@NgModule({
    imports: [
        CommonModule,
        MusicRoutingModule,
        ShareModule,

        StoreModule.forFeature('music', reducers),
    ],
    declarations: [MusicComponent, MusicListComponent, AlbumDetailsComponent, MillisToMsPipe]
})
export class MusicModule {
}
