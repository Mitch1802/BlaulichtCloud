import { Observable } from 'rxjs';

export abstract class AppStartFacade {
  abstract readonly verfuegbareModule$: Observable<any | null>;

  abstract getStartKonfig(): any | null;
}
