import { Observable } from 'rxjs';
import { ModulKonfiguration } from '../models/modul-konfiguration.dto';

export abstract class InfraStartFacade {
  abstract getStartKonfig(): Observable<ModulKonfiguration>;
}