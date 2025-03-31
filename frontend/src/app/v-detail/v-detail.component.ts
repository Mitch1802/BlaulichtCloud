import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../_template/header/header.component';

import { VKatastropheComponent } from '../_template/v-katastrophe/v-katastrophe.component';
import { VGefahrComponent } from '../_template/v-gefahr/v-gefahr.component';
import { VMassnahmeComponent } from '../_template/v-massnahme/v-massnahme.component';
import { VRolleComponent } from '../_template/v-rolle/v-rolle.component';
import { VKontaktComponent } from '../_template/v-kontakt/v-kontakt.component';
import { VDokumentComponent } from '../_template/v-dokument/v-dokument.component';
import { VFahrzeugComponent } from '../_template/v-fahrzeug/v-fahrzeug.component';
import { VKmaterialComponent } from '../_template/v-kmaterial/v-kmaterial.component';
import { VUserComponent } from '../user/user.component';
import { VKonfigurationComponent } from '../_template/v-konfiguration/v-konfiguration.component';
import { VSelfComponent } from '../_template/v-self/v-self.component';

@Component({
    selector: 'app-v-detail',
    templateUrl: './v-detail.component.html',
    styleUrls: ['./v-detail.component.sass'],
    standalone: true,
    imports: [HeaderComponent, VKatastropheComponent, VGefahrComponent, VMassnahmeComponent, VRolleComponent, VKontaktComponent, VDokumentComponent, VFahrzeugComponent, VKmaterialComponent, VUserComponent, VKonfigurationComponent, VSelfComponent]
})
export class VDetailComponent implements OnInit {
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  modul: string = "";
  kuerzelModul: string = "";
  breadcrumbin: any;

  ngOnInit(): void {
    this.modul = this.activatedRoute.snapshot.paramMap.get('modul')!;
  }

  updateBreadcrumb(event: any) {
    setTimeout(() => {
      this.breadcrumbin = event;
    })
  }
}
