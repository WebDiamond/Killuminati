import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {ParticlesModule} from 'angular-particle';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {LoadingComponent} from './static/loading/loading.component';
import {ErrorComponent} from './static/error/error.component';
import {StartgameComponent} from './game/init/startgame/startgame.component';
import {OverlayComponent} from './overlay/overlay.component';
import {SendRankComponent} from './send-rank/send-rank.component';
import {TopRankComponent} from './top-rank/top-rank.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    ErrorComponent,
    StartgameComponent,
    OverlayComponent,
    SendRankComponent,
    TopRankComponent,
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




