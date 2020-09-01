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

  formatStatus(apiStatus: any) {
    const next = apiStatus.next_mode.map(element => {
      element.from = element.from.split(' ')[0];
      element.code = element.code_mode.toLowerCase();
      return element;
    });
    return {
      code: apiStatus.code_current_mode.toLowerCase(),
      lib_mode: apiStatus.lib_current_mode,
      status: {
        north: this.getColor(apiStatus['TIME-CERTE-STBREVIN']),
        south: this.getColor(apiStatus['TIME-STBREVIN-CERTE'])
      },
      next
    };
  }

  getColor(time: any) {
    time = parseInt(time, 10);
    return time >= 7 ? (time > 15 ? 'rouge' : 'orange')  : 'vert';
  }
}
