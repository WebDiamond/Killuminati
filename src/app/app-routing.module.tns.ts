import {NgModule} from '@angular/core';
import {NativeScriptRouterModule} from 'nativescript-angular/router';
import {Routes} from '@angular/router';

import {MobileInitComponent} from '@src/app/mobile-init/auto-generated.component';

export const routes: Routes = [
  {
      path: '',
      redirectTo: '/mobile-init',
      pathMatch: 'full',
  },
  {
      path: 'mobile-init',
      component: MobileInitComponent,
  },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
