import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {NativeScriptModule} from 'nativescript-angular/nativescript.module';
import {AppRoutingModule} from '@src/app/app-routing.module.tns';
import {AppComponent} from '@src/app/app.component';
import {MobileInitComponent} from '@src/app/components/mobile-init/auto-generated.component';
import {InterfaceComponent} from '@src/app/components/interface/interface.component';
import {AdsComponent} from '@src/app/components/ads/ads.component';
import {ParticlesComponent} from '@src/app/static/particles/particles.component';


// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from 'nativescript-angular/forms';

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';

@NgModule({
  declarations: [
    AppComponent,
    MobileInitComponent,
    InterfaceComponent,
    AdsComponent,
    ParticlesComponent,
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
