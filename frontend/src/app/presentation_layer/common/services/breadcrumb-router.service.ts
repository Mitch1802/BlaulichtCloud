import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Crumb { label: string; url: string; active: boolean; }

@Injectable({ providedIn: 'root' })
export class BreadcrumbRouterService {
  private router = inject(Router);
  private root = inject(ActivatedRoute);

  readonly crumbs$: Observable<Crumb[]> = this.router.events.pipe(
    // bei echter Navigation …
    filter(e => e instanceof NavigationEnd),
    // … und einmal sofort beim Subscribe
    startWith(null),
    map(() => {
      const acc: Crumb[] = [];
      this.walk(this.root, '', acc);
      return acc.map((c, i, arr) => ({ ...c, active: i === arr.length - 1 }));
    })
  );

  private walk(route: ActivatedRoute, baseUrl: string, acc: Crumb[]) {
    const cfg = route.routeConfig;
    const path = cfg?.path ?? '';
    const seg  = this.materialize(path, route);
    const url  = seg ? `${baseUrl}/${seg}` : baseUrl;

    const label = route.snapshot.data?.['breadcrumb'] as string | undefined;
    if (label) acc.push({ label, url, active: false });

    for (const child of route.children) this.walk(child, url, acc);
  }

  private materialize(path: string, route: ActivatedRoute): string {
    if (!path) return '';
    return path.split('/').map(s =>
      s.startsWith(':') ? (route.snapshot.paramMap.get(s.slice(1)) ?? s) : s
    ).join('/');
  }
}
