import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleComponent } from './people.component';
import { ActorDetailsComponent } from './actor-details/actor-details.component';
import { ActorExistGuard } from './guards/actor-exist.guard';
import { SearchListExistGuard } from './guards/search-list-exist.guard';
import { SearchListComponent } from './search-list/search-list.component';
import { ArtistDetailsComponent } from './artist-details/artist-details.component';
import { ArtistExistGuard } from './guards/artist-exist.guard';
import { TokenExistGuard } from '../music/guards/token-exist.guard';

const routes: Routes = [
    {
        path: '',
        component: PeopleComponent,
        children: [
            {path: 'actor/:id', component: ActorDetailsComponent, canActivate: [ActorExistGuard]},
            {path: 'artist/:id', component: ArtistDetailsComponent, canActivate: [TokenExistGuard, ArtistExistGuard]},
            {path: 'search', component: SearchListComponent, canActivate: [SearchListExistGuard]}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        SearchListExistGuard,
        ActorExistGuard,
        ArtistExistGuard,
        TokenExistGuard,
    ]
})
export class PeopleRoutingModule {
}
