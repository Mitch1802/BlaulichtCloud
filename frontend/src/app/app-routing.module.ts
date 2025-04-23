import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StartComponent } from './start/start.component';
import { UserComponent } from './user/user.component';
import { KonfigurationComponent } from './konfiguration/konfiguration.component';
import { MitgliedComponent } from './mitglied/mitglied.component';
import { FmdComponent } from './fmd/fmd.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'start', component: StartComponent
  },
  {
    path: 'fmd', component: FmdComponent
  },
  {
    path: 'mitglied', component: MitgliedComponent
  },
  {
    path: 'benutzer', component: UserComponent
  },
  {
    path: 'konfiguration', component: KonfigurationComponent
  },
  {
    path: '*', component: LoginComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {onSameUrlNavigation: "reload"})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
