import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwlFormFieldModule, OwlInputModule, OwlRippleModule } from 'owl-ng';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin.component';
import { ShareModule } from '../share/share.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        ReactiveFormsModule,
        ShareModule,

        // owl ng
        OwlRippleModule,
        OwlFormFieldModule,
        OwlInputModule,
    ],
    declarations: [LoginComponent, AdminComponent]
})
export class AdminModule {
}
