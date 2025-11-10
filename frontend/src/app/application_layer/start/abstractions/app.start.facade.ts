import { Observable } from 'rxjs';
import { Modul } from '../models/modul.models';

export abstract class AppStartFacade {
  abstract readonly verfuegbareModule$: Observable<any | null>;

  abstract getStartKonfig(): any | null;
}
