/**
 * app.routing
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'movies', pathMatch: 'full'},
    {path: 'books', loadChildren: 'app/book/book.module#BookModule'},
    {path: 'movies', loadChildren: 'app/movie/movie.module#MovieModule'},
    {path: 'tv', loadChildren: 'app/tv/tv.module#TvModule'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
