import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {ReactiveFormsModule} from '@angular/forms';
import {JwtInterceptor} from "@src/app/services/auth/interceptors/jwt.interceptor";
import {ErrorInterceptor} from "@src/app/services/auth/interceptors/error.interceptor";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from '@src/app/app-routing.module';
import {ParticlesModule} from 'angular-particle';
import {AppComponent} from '@src/app/app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '@src/environments/environment';
import {LoadingComponent} from '@src/app/static/loading/loading.component';
import {ErrorComponent} from '@src/app/static/error/error.component';
import {StartgameComponent} from '@src/app/components/game/init/startgame/startgame.component';
import {OverlayComponent} from '@src/app/static/overlay/overlay.component';
import {SendRankComponent} from '@src/app/components/send-rank/send-rank.component';
import {TopRankComponent} from '@src/app/components/top-rank/top-rank.component';
import {MobileInitComponent} from '@src/app/components/mobile-init/auto-generated.component';
import {RealtimeComponent} from '@src/app/components/realtime/realtime.component';
import {LoginComponent} from '@src/app/components/login/login.component';
import {AuthedComponent} from '@src/app/components/authed/authed.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    ErrorComponent,
    StartgameComponent,
    OverlayComponent,
    SendRankComponent,
    TopRankComponent,
    MobileInitComponent,
    RealtimeComponent,
    LoginComponent,
    AuthedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ParticlesModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }




