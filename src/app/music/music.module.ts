import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { OwlDialogModule } from 'owl-ng';

import { MusicRoutingModule } from './music-routing.module';
import { MusicComponent } from './music.component';
import { MusicListComponent } from './music-list/music-list.component';
import { ShareModule } from '../share/share.module';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { reducers } from './reducers';
import { AlbumCardComponent } from './album-card/album-card.component';
import { SearchListComponent } from './search-list/search-list.component';

@NgModule({
    imports: [
        CommonModule,
        MusicRoutingModule,
        ShareModule,

        // Owl NG
        OwlDialogModule,

        StoreModule.forFeature('music', reducers),
    ],
    declarations: [MusicComponent, MusicListComponent, AlbumDetailsComponent, AlbumCardComponent, SearchListComponent],
})
export class MusicModule {
}
