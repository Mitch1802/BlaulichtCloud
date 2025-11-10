import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { StartComponent } from './start/start.component';
import { UserComponent } from './user/user.component';
import { KonfigurationComponent } from './konfiguration/konfiguration.component';
import { MitgliedComponent } from './mitglied/mitglied.component';
import { FmdComponent } from './fmd/fmd.component';
import { ModulKonfigurationComponent } from './modul-konfiguration/modul-konfiguration.component';
import { AtemschutzComponent } from './atemschutz/atemschutz.component';
import { NewsComponent } from './news/news.component';
import { InventarComponent } from './inventar/inventar.component';
import { NewsExternComponent } from './news-extern/news-extern.component';
import { AtemschutzMessgeraeteComponent } from './_template/atemschutz-messgeraete/atemschutz-messgeraete.component';
import { AtemschutzGeraeteComponent } from './_template/atemschutz-geraete/atemschutz-geraete.component';
import { AtemschutzMaskenComponent } from './_template/atemschutz-masken/atemschutz-masken.component';

import { startOrLoginHelper } from './presentation_layer/helpers/auth/start-or-login.helper';
import { redirectIfAuthHelper } from './presentation_layer/helpers/auth/redirect-if-auth.helper';
import { requireAuthHelper } from './presentation_layer/helpers/auth/require-auth.helper';

export const routes: Routes = [
  { path: '', canActivate: [startOrLoginHelper], children: [] },
  {
    path: 'login',
    canActivate: [redirectIfAuthHelper],
    loadComponent: () => import('./presentation_layer/features/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'start',
    canActivate: [requireAuthHelper],
    loadComponent: () => import('./presentation_layer/features/start/start.component').then(m => m.StartComponent)
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
    path: 'atemschutz/masken', component: AtemschutzMaskenComponent
  },
  {
    path: 'atemschutz/geraete', component: AtemschutzGeraeteComponent
  },
  {
    path: 'atemschutz/messgeraete', component: AtemschutzMessgeraeteComponent
  },
  {
    path: 'news', component: NewsComponent
  },
  {
    path: 'newsfeed', component: NewsExternComponent
  },
  {
    path: 'inventar', component: InventarComponent
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
  { path: '**', redirectTo: '' }
];
