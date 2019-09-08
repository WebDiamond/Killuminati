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
import {StartgameComponent} from '@src/app/game/init/startgame.component';
import {OverlayComponent} from '@src/app/menu/overlay.component';
import {HttpClientModule} from "@angular/common/http";
import {AdsComponent} from '@src/app/static/ads/ads.component';
import {ParticlesComponent} from '@src/app/static/particles/particles.component';
import {GamepadComponent} from '@src/app/static/gamepad/gamepad.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    ErrorComponent,
    StartgameComponent,
    OverlayComponent,
    AdsComponent,
    ParticlesComponent,
    GamepadComponent,
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




