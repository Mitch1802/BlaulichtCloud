import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StartComponent } from './start/start.component';
import { UserComponent } from './user/user.component';
import { KonfigurationComponent } from './konfiguration/konfiguration.component';
import { MitgliedComponent } from './mitglied/mitglied.component';
import { FmdComponent } from './fmd/fmd.component';
import { ModulKonfigurationComponent } from './modul-konfiguration/modul-konfiguration.component';
import { AtemschutzComponent } from './atemschutz/atemschutz.component';
import { VerwaltungComponent } from './verwaltung/verwaltung.component';

export const routes: Routes = [
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
    path: 'atemschutz', component: AtemschutzComponent
  },
  {
    path: 'verwaltung', component: VerwaltungComponent
  },
  {
    path: 'modul_konfiguration', component: ModulKonfigurationComponent
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
