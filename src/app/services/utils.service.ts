import { Injectable } from '@angular/core';
import { Plugins, AppState } from '@capacitor/core';
import { Observable } from 'rxjs';

const { App } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  appStateChangeDetector() {
    return new Observable(observer => {
      App.addListener('appStateChange', (state: AppState) => {
        observer.next(state);
      });
    });
  }
}
