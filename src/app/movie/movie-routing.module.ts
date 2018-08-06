import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieComponent } from './movie.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieListExistGuard } from './guards/movie-list-exist.guard';
import { MovieExistGuard } from './guards/movie-exist.guard';
import { MovieHomeComponent } from './movie-home/movie-home.component';
import { SearchListComponent } from './search-list/search-list.component';
import { SearchListExistGuard } from './guards/search-list-exist.guard';
import { CollectionComponent } from './collection/collection.component';
import { AuthGuard } from '../user/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: MovieComponent,
        children: [
            {path: '', component: MovieHomeComponent, canActivate: [MovieListExistGuard]},
            {path: 'list', redirectTo: 'list/now_playing', pathMatch: 'full'},
            {path: 'list/:query', component: MovieListComponent, canActivate: [MovieListExistGuard]},
            {path: 'search', component: SearchListComponent, canActivate: [SearchListExistGuard]},
            {path: ':id/details', component: MovieDetailsComponent, canActivate: [MovieExistGuard]},
            {path: 'collection', component: CollectionComponent, canActivate: [AuthGuard]},
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MovieRoutingModule {
}
