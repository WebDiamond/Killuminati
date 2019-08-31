import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "@src/app/components/login/login.component";
import {AuthGuard} from "@src/app/services/auth/auth.guard";
import {AuthedComponent} from "@src/app/components/authed/authed.component";

const routes: Routes = [
  { path: 'panel', component: AuthedComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
