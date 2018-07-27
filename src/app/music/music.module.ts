import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MusicRoutingModule } from './music-routing.module';
import { MusicComponent } from './music.component';
import { MusicListComponent } from './music-list/music-list.component';
import { ShareModule } from '../share/share.module';

@NgModule({
    imports: [
        CommonModule,
        MusicRoutingModule,
        ShareModule,
    ],
    declarations: [MusicComponent, MusicListComponent]
})
export class MusicModule {
}
