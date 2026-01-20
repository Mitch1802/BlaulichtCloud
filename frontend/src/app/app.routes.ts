import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import("./login/login.component").then(m => m.LoginComponent),
  },
  {
    path: 'start',
    loadComponent: () => import("./start/start.component").then(m => m.StartComponent),
  },
  {
    path: 'fmd',
    loadComponent: () => import("./fmd/fmd.component").then(m => m.FmdComponent),
  },
  {
    path: 'mitglied',
    loadComponent: () => import("./mitglied/mitglied.component").then(m => m.MitgliedComponent),
  },
  {
    path: 'atemschutz',
    loadComponent: () => import("./atemschutz/atemschutz.component").then(m => m.AtemschutzComponent),
  },
  {
    path: 'atemschutz/masken',
    loadComponent: () => import("./_template/atemschutz-masken/atemschutz-masken.component").then(m => m.AtemschutzMaskenComponent),
  },
  {
    path: 'atemschutz/geraete',
    loadComponent: () => import("./_template/atemschutz-geraete/atemschutz-geraete.component").then(m => m.AtemschutzGeraeteComponent),
  },
  {
    path: 'atemschutz/messgeraete',
    loadComponent: () => import("./_template/atemschutz-messgeraete/atemschutz-messgeraete.component").then(m => m.AtemschutzMessgeraeteComponent),
  },
  {
    path: 'atemschutz/dienstbuch',
    loadComponent: () => import("./_template/atemschutz-dienstbuch/atemschutz-dienstbuch.component").then(m => m.AtemschutzDienstbuchComponent),
  },
  {
    path: 'news',
    loadComponent: () => import("./news/news.component").then(m => m.NewsComponent),
  },
  {
    path: 'newsfeed',
    loadComponent: () => import("./news-extern/news-extern.component").then(m => m.NewsExternComponent),
  },
  {
    path: 'inventar',
    loadComponent: () => import("./inventar/inventar.component").then(m => m.InventarComponent),
  },
  {
    path: "fahrzeuge",
    loadComponent: () => import("./fahrzeug/fahrzeug.component").then(m => m.FahrzeugComponent),
  },
  {
    path: "fahrzeuge/:id/check",
    loadComponent: () => import("./fahrzeug/fahrzeug-check.component").then(m => m.FahrzeugCheckComponent),
  },
  {
    path: "public/fahrzeuge/:publicId",
    loadComponent: () => import("./fahrzeug/public-fahrzeug.component").then(m => m.PublicFahrzeugComponent),
  },
  {
    path: 'verwaltung',
    loadComponent: () => import("./verwaltung/verwaltung.component").then(m => m.VerwaltungComponent),
  },
  {
    path: 'pdf_template',
    loadComponent: () => import("./pdf-template/pdf-template.component").then(m => m.PdfTemplatesComponent),
  },
  {
    path: 'modul_konfiguration',
    loadComponent: () => import("./modul-konfiguration/modul-konfiguration.component").then(m => m.ModulKonfigurationComponent),
  },
  {
    path: 'benutzer',
    loadComponent: () => import("./user/user.component").then(m => m.UserComponent),
  },
  {
    path: 'konfiguration',
    loadComponent: () => import("./konfiguration/konfiguration.component").then(m => m.KonfigurationComponent),
  },
  {
    path: 'eigene_daten',
    loadComponent: () => import("./eigene-daten/eigene-daten.component").then(m => m.EigeneDatenComponent),
  },
  {
    path: '**', redirectTo: 'login'
  }
];
