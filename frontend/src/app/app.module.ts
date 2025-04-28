import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { StartComponent } from './start/start.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from './_template/header/header.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoadingInterceptor } from './_interceptor/loading.interceptor';
import { KonfigurationComponent } from './konfiguration/konfiguration.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { FmdComponent } from './fmd/fmd.component';
import { MitgliedComponent } from './mitglied/mitglied.component';
import { MatChipsModule } from '@angular/material/chips';
import { AtemschutzComponent } from './atemschutz/atemschutz.component';
import { VerwaltungComponent } from './verwaltung/verwaltung.component';
import { MatTableModule } from '@angular/material/table';


@NgModule({
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        CommonModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatToolbarModule,
        MatIconModule,
        MatCheckboxModule,
        MatSelectModule,
        MatListModule,
        MatTabsModule,
        MatTreeModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatAutocompleteModule,
        MatProgressBarModule,
        MatChipsModule,
        MatDatepickerModule,
        MatTableModule,
        SpinnerComponent,
        HeaderComponent,
        LoginComponent,
        StartComponent,
        UserComponent,
        KonfigurationComponent,
        FmdComponent,
        MitgliedComponent,
        AtemschutzComponent,
        VerwaltungComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
        provideHttpClient(withInterceptorsFromDi()),
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { subscriptSizing: 'dynamic' }}
    ]
})
export class AppModule { }
