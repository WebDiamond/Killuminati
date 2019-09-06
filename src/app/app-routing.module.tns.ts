import {NgModule} from '@angular/core';
import {NativeScriptRouterModule} from 'nativescript-angular/router';
import {Routes} from '@angular/router';


export const routes: Routes = [
  {
      path: '',
      redirectTo: '/mobile-init',
      pathMatch: 'full',
  },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
