import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalDataService } from '../_service/global-data.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { OfflineDataService } from '../_service/offline-data.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass'],
    standalone: true,
    imports: [MatCardModule, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatIcon, MatSuffix, MatButton]
})

export class LoginComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private globalDataService = inject(GlobalDataService);
  private offlineDataService = inject(OfflineDataService);

  modul: string = "auth/login";
  form!: FormGroup;
  footer: string = "";
  networkStatus: any;

  public showPassword: boolean = false;

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {
    this.offlineDataService.checkNetworkStatus();
    this.networkStatus = this.offlineDataService.networkStatus;

    if (sessionStorage.getItem("KatPlanToken")) {
      this.router.navigate(['/start']);
    } else {
      this.ladeFooter();
      sessionStorage.clear();

      if (this.networkStatus) {
        this.form = this.formBuilder.group({
          user: ['', Validators.required],
          pwd: ['', Validators.required]
        });
      }else{
        this.form = this.formBuilder.group({
          user: ['', Validators.required]
        });
      }
    }
  }

  get f() { return this.form.controls; }

  async offlineAnmelden() {
    let username: string = this.f.user.value;
    let user: any = [];
    let networkStatus = navigator.onLine;
    if (networkStatus == true){
      this.anmelden();
    }else {
      const data = await this.offlineDataService.getOfflineData();
      user = JSON.parse(data["benutzer"]);
    }

    for (let i = 0; i <user.length; i++) {
      let child = user[i];
      if (username == child["username"]) {
        sessionStorage.setItem('KatPlanVerwaltung', String(child.is_verwaltung));
        sessionStorage.setItem('KatPlanBenutzerVerwaltung', String(child.is_staff));
        this.router.navigate(['/start']);
      }
    }
  }

  anmelden(): void {
    let data = {
      "username": this.f.user.value,
      "password": this.f.pwd.value
    };

    this.globalDataService.post(this.modul, data, false).subscribe({
      next: (erg: any) => {
        try {
          sessionStorage.setItem("KatPlanToken", erg.access_token);
          sessionStorage.setItem('KatPlanBenutzername', erg.user.username);
          sessionStorage.setItem('KatPlanVerwaltung', String(erg.user.is_verwaltung));
          sessionStorage.setItem('KatPlanBenutzerVerwaltung', String(erg.user.is_staff));
          this.router.navigate(['/start']);
        } catch (e: any) {
          this.globalDataService.erstelleMessage("error", e);
        }
      },
      error: (error: any) => {
        this.globalDataService.errorAnzeigen(error);
      }
    });
  }

  ladeFooter(): void {
    this.footer = this.globalDataService.ladeFooter();
  }
}
