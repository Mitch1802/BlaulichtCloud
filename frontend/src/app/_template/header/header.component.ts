import { Component, OnInit, Input, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GlobalDataService } from 'src/app/_service/global-data.service';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass'],
    standalone: true,
    imports: [
    MatToolbar,
    RouterLink,
    MatIconButton,
    MatIconModule,
    MatButton
],
})
export class HeaderComponent implements OnInit {
  globalDataService = inject(GlobalDataService);
  private router = inject(Router);

  title: string = '';

  @Input() breadcrumb!: any;

  ngOnInit(): void {
    this.title = this.globalDataService.Titel;
  }

  onClick(link: string, pageNumber: number): void {
    if (pageNumber == 2) {
      sessionStorage.setItem("KatPlanPageNumber","2")
      sessionStorage.setItem("KatPlanPage3", "");
      sessionStorage.setItem("KatPlanPage4", "");
      sessionStorage.setItem("KatPlanPage5", "");
      sessionStorage.setItem("KatPlanPage6", "");
    } else if (pageNumber == 3) {
      sessionStorage.setItem("KatPlanPageNumber","3")
      sessionStorage.setItem("KatPlanPage4", "");
      sessionStorage.setItem("KatPlanPage5", "");
      sessionStorage.setItem("KatPlanPage6", "");
    } else if (pageNumber == 4) {
      sessionStorage.setItem("KatPlanPageNumber","4")
      sessionStorage.setItem("KatPlanPage5", "");
      sessionStorage.setItem("KatPlanPage6", "");
    } else if (pageNumber == 5) {
      sessionStorage.setItem("KatPlanPageNumber","5")
      sessionStorage.setItem("KatPlanPage6", "");
    }

    this.globalDataService.ladeBreadcrumb();
    this.router.navigate([link]);
  }
}
