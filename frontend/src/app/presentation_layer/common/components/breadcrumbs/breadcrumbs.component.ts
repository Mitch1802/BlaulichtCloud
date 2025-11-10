import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BreadcrumbRouterService } from '../../services/breadcrumb-router.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-breadcrumbs',
  imports: [CommonModule, RouterLink, MatButtonModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.sass'],
})
export class BreadcrumbsComponent {
  readonly crumbs$ = inject(BreadcrumbRouterService).crumbs$;
}
