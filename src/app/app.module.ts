import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from '@src/app/app-routing.module';
import {ParticlesModule} from 'angular-particle';
import {AppComponent} from '@src/app/app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '@src/environments/environment';
import {LoadingComponent} from '@src/app/static/loading/loading.component';
import {ErrorComponent} from '@src/app/static/error/error.component';
import {StartgameComponent} from '@src/app/game/init/startgame/startgame.component';
import {OverlayComponent} from '@src/app/overlay/overlay.component';
import {SendRankComponent} from '@src/app/send-rank/send-rank.component';
import {TopRankComponent} from '@src/app/top-rank/top-rank.component';
import {MobileInitComponent} from '@src/app/mobile-init/auto-generated.component';
import {RealtimeComponent} from '@src/app/realtime/realtime.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ParticlesModule,
    RouterModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }




