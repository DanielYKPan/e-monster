import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MovieRoutingModule } from './movie-routing.module';
import { MovieComponent } from './movie.component';
import { MovieService } from './service/movie.service';
import { reducers } from './reducers';
import { MovieEffect } from './effects/movie';
import { VideoEffect } from './effects/video';
import { MovieListComponent } from './movie-list/movie-list.component';
import { GenreListExistGuard } from './guards/genre-list-exist.guard';
import { MovieListExistGuard } from './guards/movie-list-exist.guard';
import { VotePercentagePipe } from './pipe/vote-percentage.pipe';
import { SafePipe } from './pipe/safe.pipe';
import { MovieListContentComponent } from './movie-list-content/movie-list-content.component';
import { MovieListCardComponent } from './movie-list-card/movie-list-card.component';
import { MovieListSidenavComponent } from './movie-list-sidenav/movie-list-sidenav.component';
import { MovieTrailerDialogComponent } from './movie-trailer-dialog/movie-trailer-dialog.component';
import { LoaderComponent } from './loader/loader.component';

import {
    OwlDialogModule,
    OwlMenuModule,
    OwlTooltipModule
} from 'owl-ng';

@NgModule({
    imports: [
        CommonModule,
        MovieRoutingModule,

        OwlDialogModule,
        OwlMenuModule,
        OwlTooltipModule,

        StoreModule.forFeature('movies', reducers),
        EffectsModule.forFeature([MovieEffect, VideoEffect])
    ],
    declarations: [
        MovieComponent,
        MovieListComponent,
        VotePercentagePipe,
        MovieListContentComponent,
        MovieListCardComponent,
        MovieListSidenavComponent,
        LoaderComponent,
        MovieTrailerDialogComponent,
        SafePipe
    ],
    providers: [MovieService, GenreListExistGuard, MovieListExistGuard],
    entryComponents: [MovieTrailerDialogComponent]
})
export class MovieModule {
}
