import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CollectionComponent } from './collection/collection.component';

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'my-collection', component: CollectionComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {
}
