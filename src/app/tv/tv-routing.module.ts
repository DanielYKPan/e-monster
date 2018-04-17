import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TvComponent } from './tv.component';
import { TvListComponent } from './tv-list/tv-list.component';
import { TvListExistGuard } from './guards/tv-list-exist.guard';
import { TvDetailsComponent } from './tv-details/tv-details.component';
import { TvExistGuard } from './guards/tv-exist.guard';

const routes: Routes = [
    {
        path: '',
        component: TvComponent,
        children: [
            {path: '', redirectTo: 'list/on_the_air', pathMatch: 'full'},
            {path: 'list/:query', component: TvListComponent, canActivate: [TvListExistGuard]},
            {path: ':id/details', component: TvDetailsComponent, canActivate: [TvExistGuard]}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TvRoutingModule {
}
