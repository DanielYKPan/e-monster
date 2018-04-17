import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieComponent } from './movie.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { SearchResultsExistGuard } from './guards/search-results-exist.guard';
import { MovieExistGuard } from './guards/movie-exist.guard';
import { MovieHomeComponent } from './movie-home/movie-home.component';

const routes: Routes = [
    {
        path: '',
        component: MovieComponent,
        children: [
            {path: '', component: MovieHomeComponent, canActivate: [SearchResultsExistGuard]},
            {path: 'list/:query', component: MovieListComponent, canActivate: [SearchResultsExistGuard]},
            {path: ':id/details', component: MovieDetailsComponent, canActivate: [MovieExistGuard]},
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MovieRoutingModule {
}
