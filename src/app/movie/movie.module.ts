import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { OwlChipsModule, OwlDialogModule, OwlMenuModule, OwlTooltipModule } from 'owl-ng';

import { MovieRoutingModule } from './movie-routing.module';
import { MovieComponent } from './movie.component';
import { MovieService } from './service/movie.service';
import { reducers } from './reducers';
import { MovieEffect } from './effects/movie';
import { VideoEffect } from './effects/video';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieListExistGuard } from './guards/movie-list-exist.guard';
import { MovieExistGuard } from './guards/movie-exist.guard';
import { MovieHomeComponent } from './movie-home/movie-home.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieDetailsSimilarComponent } from './movie-details/movie-details-similar/movie-details-similar.component';
import { ShareModule } from '../share/share.module';
import { SearchListComponent } from './search-list/search-list.component';
import { SearchListExistGuard } from './guards/search-list-exist.guard';
import { CollectionEffects } from './effects/collection.effects';
import { CollectionComponent } from './collection/collection.component';

@NgModule({
    imports: [
        CommonModule,
        MovieRoutingModule,
        ShareModule,

        OwlDialogModule,
        OwlMenuModule,
        OwlTooltipModule,
        OwlChipsModule,

        StoreModule.forFeature('movies', reducers),
        EffectsModule.forFeature([MovieEffect, VideoEffect, CollectionEffects])
    ],
    declarations: [
        MovieComponent,
        MovieListComponent,
        MovieDetailsComponent,
        MovieDetailsSimilarComponent,
        MovieHomeComponent,
        SearchListComponent,
        CollectionComponent,
    ],
    providers: [
        MovieService,
        MovieListExistGuard,
        MovieExistGuard,
        SearchListExistGuard,
    ]
})
export class MovieModule {
}
