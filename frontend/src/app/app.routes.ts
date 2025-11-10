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
    data: { breadcrumb: 'Start' },
    loadComponent: () => import('./presentation_layer/features/start/start.component').then(m => m.StartComponent)
  },
  // // FMD
  // { path: 'fmd',
  //   data: { breadcrumb: 'FMD' },
  //   loadComponent: () => import('./presentation_layer/features/fmd/fmd.component').then(m => m.FmdComponent)
  // },

  // // Atemschutz
  // { path: 'atemschutz',
  //   data: { breadcrumb: 'Atemschutz' },
  //   children: [
  //     { path: 'masken',
  //       data: { breadcrumb: 'Masken' },
  //       loadComponent: () => import('./presentation_layer/features/atemschutz/masken/masken.component').then(m => m.MaskenComponent)
  //     },
  //     { path: 'geraete',
  //       data: { breadcrumb: 'Geräte' },
  //       loadComponent: () => import('./presentation_layer/features/atemschutz/geraete/geraete.component').then(m => m.GeraeteComponent)
  //     },
  //     { path: 'messgeraete',
  //       data: { breadcrumb: 'Messgeräte' },
  //       loadComponent: () => import('./presentation_layer/features/atemschutz/messgeraete/messgeraete.component').then(m => m.MessgeraeteComponent)
  //     },
  //   ]
  // },
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
