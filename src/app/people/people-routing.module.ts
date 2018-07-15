import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleComponent } from './people.component';
import { ActorDetailsComponent } from './actor-details/actor-details.component';

const routes: Routes = [
    {
        path: '',
        component: PeopleComponent,
        children: [
            {path: 'actor/:id', component: ActorDetailsComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PeopleRoutingModule {
}
