import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CollectionComponent } from './collection/collection.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'my-collection', component: CollectionComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [AuthGuard],
})
export class UserRoutingModule {
}
