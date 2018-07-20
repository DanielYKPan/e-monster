import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MusicRoutingModule } from './music-routing.module';
import { MusicComponent } from './music.component';

@NgModule({
    imports: [
        CommonModule,
        MusicRoutingModule
    ],
    declarations: [MusicComponent]
})
export class MusicModule {
}
