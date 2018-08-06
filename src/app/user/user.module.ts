import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { OwlFormFieldModule, OwlInputModule, OwlRippleModule } from 'owl-ng';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { ShareModule } from '../share/share.module';
import { reducers } from './reducers';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { AuthService } from './service/auth.service';
import { AuthEffects } from './effects/auth.effects';
import { CollectionComponent } from './collection/collection.component';
import { CollectionEffects } from './effects/collection.effects';

@NgModule({
    imports: [
        CommonModule,
        UserRoutingModule,
        ReactiveFormsModule,
        ShareModule,

        // owl ng
        OwlRippleModule,
        OwlFormFieldModule,
        OwlInputModule,

        StoreModule.forFeature('user', reducers),
        EffectsModule.forFeature([AuthEffects, CollectionEffects]),
    ],
    declarations: [LoginComponent, LoginFormComponent, CollectionComponent],
    providers: [AuthService]
})
export class UserModule {
}
