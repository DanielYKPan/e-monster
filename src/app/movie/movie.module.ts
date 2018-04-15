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
import { SearchResultsExistGuard } from './guards/search-results-exist.guard';
import { MovieExistGuard } from './guards/movie-exist.guard';
import { SafePipe } from './pipe/safe.pipe';
import { ToDatePipe } from './pipe/date-string.pipe';
import { MovieHomeComponent } from './movie-home/movie-home.component';
import { MovieListContentComponent } from './movie-list/movie-list-content/movie-list-content.component';
import { MovieListSidenavComponent } from './movie-list/movie-list-sidenav/movie-list-sidenav.component';
import { MovieTrailerDialogComponent } from './movie-trailer-dialog/movie-trailer-dialog.component';
import { MovieCastDialogComponent } from './movie-cast-dialog/movie-cast-dialog.component';
import { MovieDetailsHeaderComponent } from './movie-details/movie-details-header/movie-details-header.component';
import { MovieDetailsContentComponent } from './movie-details/movie-details-content/movie-details-content.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieDetailsSimilarComponent } from './movie-details/movie-details-similar/movie-details-similar.component';
import { LoaderComponent } from './loader/loader.component';

import { OwlChipsModule, OwlDialogModule, OwlMenuModule, OwlTooltipModule } from 'owl-ng';
import { ShareModule } from '../share/share.module';

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
        EffectsModule.forFeature([MovieEffect, VideoEffect])
    ],
    declarations: [
        MovieComponent,
        MovieListComponent,
        MovieListContentComponent,
        MovieListSidenavComponent,
        LoaderComponent,
        MovieTrailerDialogComponent,
        SafePipe,
        MovieDetailsComponent,
        MovieCastDialogComponent,
        MovieDetailsHeaderComponent,
        MovieDetailsContentComponent,
        ToDatePipe,
        MovieDetailsSimilarComponent,
        MovieHomeComponent,
    ],
    providers: [
        MovieService,
        SearchResultsExistGuard,
        MovieExistGuard,
    ],
    entryComponents: [
        MovieTrailerDialogComponent,
        MovieCastDialogComponent
    ]
})
export class MovieModule {
}
