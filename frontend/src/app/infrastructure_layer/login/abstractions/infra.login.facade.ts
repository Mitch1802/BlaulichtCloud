import { Observable } from 'rxjs';
import { LoginRequestDto } from '../models/login-request.dto';
import { LoginResponseDto } from '../models/login-response.dto';

export abstract class InfraLoginFacade {
  abstract login(credentials: LoginRequestDto): Observable<LoginResponseDto>;
}
