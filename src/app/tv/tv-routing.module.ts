import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TvComponent } from './tv.component';
import { TvListComponent } from './tv-list/tv-list.component';
import { TvListExistGuard } from './guards/tv-list-exist.guard';
import { TvDetailsComponent } from './tv-details/tv-details.component';
import { TvExistGuard } from './guards/tv-exist.guard';
import { TvSeasonDetailsComponent } from './tv-season-details/tv-season-details.component';
import { SearchListComponent } from './search-list/search-list.component';
import { SearchListExistGuard } from './guards/search-list-exist.guard';
import { TvSeasonExistGuard } from './guards/tv-season-exist.guard';

const routes: Routes = [
    {
        path: '',
        component: TvComponent,
        children: [
            {path: '', redirectTo: 'list/on_the_air', pathMatch: 'full'},
            {path: 'list', redirectTo: 'list/on_the_air', pathMatch: 'full'},
            {path: 'list/:query', component: TvListComponent, canActivate: [TvListExistGuard]},
            {path: 'search', component: SearchListComponent, canActivate: [SearchListExistGuard]},
            {path: ':id/details', component: TvDetailsComponent, canActivate: [TvExistGuard]},
            {path: ':id/season/:number', component: TvSeasonDetailsComponent, canActivate: [TvSeasonExistGuard],},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        SearchListExistGuard,
        TvListExistGuard,
        TvSeasonExistGuard,
        TvExistGuard,
    ]
})
export class TvRoutingModule {
}
