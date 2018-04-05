import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MovieRoutingModule } from './movie-routing.module';
import { MovieComponent } from './movie.component';
import { MovieService } from './service/movie.service';
import { reducers } from './reducers';
import { MovieEffect } from './effects/movie';

@NgModule({
    imports: [
        CommonModule,
        MovieRoutingModule,

        StoreModule.forFeature('movies', reducers),
        EffectsModule.forFeature([MovieEffect])
    ],
    declarations: [MovieComponent],
    providers: [MovieService],
})
export class MovieModule {
}
