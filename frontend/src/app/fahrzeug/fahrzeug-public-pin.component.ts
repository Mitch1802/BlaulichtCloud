import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

import { HeaderComponent } from "../_template/header/header.component";
import { GlobalDataService } from "../_service/global-data.service";
import { FahrzeugePublicService } from "../_service/fahrzeuge-public.service";

@Component({
  standalone: true,
  selector: "app-fahrzeug-public-pin",
  imports: [HeaderComponent, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: "./fahrzeug-public-pin.component.html",
})
export class FahrzeugPublicPinComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private gds = inject(GlobalDataService);
  private api = inject(FahrzeugePublicService);

  breadcrumb: any[] = [];
  publicId = "";
  pin = "";

  ngOnInit(): void {
    this.breadcrumb = this.gds.ladeBreadcrumb();
    this.publicId = this.route.snapshot.paramMap.get("publicId") ?? "";
  }

  verify(): void {
    const pin = this.pin.trim();
    if (!this.publicId || !pin) return;

    this.api.verifyPin(this.publicId, pin).subscribe({
      next: (res) => {
        sessionStorage.setItem(`public_token_${this.publicId}`, res.access_token);
        this.router.navigate(["/public/fahrzeuge", this.publicId, "check"]);
      },
      error: (err: any) => this.gds.errorAnzeigen(err),
    });
  }
}
