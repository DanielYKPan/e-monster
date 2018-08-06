import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { OWL_NOTIFIER_CONFIG, OwlNotifierModule } from 'owl-ng';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShareModule } from './share/share.module';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';


@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        CoreModule,
        ShareModule,
        UserModule,
        AppRoutingModule,

        // Angular Material
        LayoutModule,
        MatSidenavModule,

        // Owl NG
        OwlNotifierModule,
    ],
    providers: [
        AppService,
        {
            provide: OWL_NOTIFIER_CONFIG, useValue: {
                maxStack: 1,
                life: 2000,
                notifierClass: 'app-notifier'
            }
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
