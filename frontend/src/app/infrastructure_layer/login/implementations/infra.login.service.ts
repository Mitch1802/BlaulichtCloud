import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InfraLoginFacade } from '../abstractions/infra.login.facade';
import { LoginRequestDto } from '../models/login-request.dto';
import { LoginResponseDto } from '../models/login-response.dto';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class InfraLoginService extends InfraLoginFacade {
  private http = inject(HttpClient);

  login(credentials: LoginRequestDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${environment.apiUrl}${environment.loginUrl}`, credentials);
  }
}
