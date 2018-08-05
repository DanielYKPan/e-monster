import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { CoreModule } from './core/core.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShareModule } from './share/share.module';
import { AppService } from './app.service';
import { MatSidenavModule } from '@angular/material';
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

        LayoutModule,
        MatSidenavModule,
    ],
    providers: [
        AppService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
