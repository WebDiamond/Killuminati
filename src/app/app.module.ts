import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from '@src/app/app-routing.module';
import {ParticlesModule} from 'angular-particle';
import {AppComponent} from '@src/app/app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '@src/environments/environment';
import {LoadingComponent} from '@src/app/static/loading/loading.component';
import {ErrorComponent} from '@src/app/static/error/error.component';
import {StartgameComponent} from '@src/app/components/game/init/startgame.component';
import {OverlayComponent} from '@src/app/components/overlay/overlay.component';
import {HttpClientModule} from "@angular/common/http";
import {InterfaceComponent} from '@src/app/components/interface/interface.component';
import {AdsComponent} from '@src/app/components/ads/ads.component';
import {ParticlesComponent} from '@src/app/static/particles/particles.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    ErrorComponent,
    StartgameComponent,
    OverlayComponent,
    InterfaceComponent,
    AdsComponent,
    ParticlesComponent,
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }




