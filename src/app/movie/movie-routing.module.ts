import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieComponent } from './movie.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieListExistGuard } from './guards/movie-list-exist.guard';

const routes: Routes = [
    {path: '', component: MovieComponent},
    {path: 'list/:type', component: MovieListComponent, canActivate: [MovieListExistGuard]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MovieRoutingModule {
}
