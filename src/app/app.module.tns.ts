import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {NativeScriptModule} from 'nativescript-angular/nativescript.module';
import {AppRoutingModule} from '@src/app/app-routing.module.tns';
import {AppComponent} from '@src/app/app.component';
import {AdsComponent} from '@src/app/ads/ads.component';
import {ParticlesComponent} from '@src/app/static/particles/particles.component';
import {GamepadComponent} from '@src/app/static/gamepad/gamepad.component';


// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from 'nativescript-angular/forms';

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';

@NgModule({
  declarations: [
    AppComponent,
    AdsComponent,
    ParticlesComponent,
    GamepadComponent,
  ],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
