import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MatButtonModule, MatMenuModule } from '@angular/material';

import { MovieRoutingModule } from './movie-routing.module';
import { MovieComponent } from './movie.component';
import { MovieService } from './service/movie.service';
import { reducers } from './reducers';
import { MovieEffect } from './effects/movie';
import { MovieListComponent } from './movie-list/movie-list.component';
import { GenreListExistGuard } from './guards/genre-list-exist.guard';
import { MovieListExistGuard } from './guards/movie-list-exist.guard';
import { VotePercentagePipe } from './vote-percentage.pipe';
import { MovieListContentComponent } from './movie-list-content/movie-list-content.component';
import { MovieListCardComponent } from './movie-list-card/movie-list-card.component';
import { MovieListSidenavComponent } from './movie-list-sidenav/movie-list-sidenav.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
    imports: [
        CommonModule,
        MovieRoutingModule,

        MatMenuModule, // TODO: use owl-ng instead
        MatButtonModule,

        StoreModule.forFeature('movies', reducers),
        EffectsModule.forFeature([MovieEffect])
    ],
    declarations: [MovieComponent, MovieListComponent, VotePercentagePipe, MovieListContentComponent, MovieListCardComponent, MovieListSidenavComponent, LoaderComponent],
    providers: [MovieService, GenreListExistGuard, MovieListExistGuard],
})
export class MovieModule {
}
