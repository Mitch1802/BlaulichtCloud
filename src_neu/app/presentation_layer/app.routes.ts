import { Routes } from '@angular/router';
// import { demoRoutes } from './features/demo/demo.routes';

export const appRoutes: Routes = [
  // { path: '', children: demoRoutes },
  { path: '**', redirectTo: '' }
];
