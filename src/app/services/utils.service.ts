import { Injectable } from '@angular/core';
import { Plugins, AppState } from '@capacitor/core';
import { Observable } from 'rxjs';
import { Status, ApiStatus } from '../models/status';
import { Event, ApiEvent } from '../models/event';

const { App } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  generateRandomEvent(): Event[] {
    const events = [];
    const rand = Math.round(Math.random() * 5);

    for (let index = 0; index < rand; index++) {
      const apiEvent: ApiEvent = {
        nature: ['Accident', 'VL en panne', 'Vent'][Math.round(Math.random() * 2)],
        statut: ['en cours', 'prévisionnel'][Math.round(Math.random())],
        datePublication: new Date(),
        ligne1: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, rem?',
        ligne2: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, rem?',
        ligne3: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, rem?',
        ligne4: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, rem?',
        ligne5: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, rem?',
        ligne6: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, rem?'
      };
      const event = this.formatEvent(apiEvent);
      events.push(event);
    }

    return events;
  }

  constructor() { }

  appStateChangeDetector() {
    return new Observable(observer => {
      App.addListener('appStateChange', (state: AppState) => {
        observer.next(state);
      });
    });
  }

  formatStatus(apiStatus: ApiStatus): Status {
    return {
      code: apiStatus.code_current_mode.toLowerCase(),
      label: apiStatus.lib_current_mode,
      colorStatus: {
        north: this.getColor(apiStatus['TIME-CERTE-STBREVIN']),
        south: this.getColor(apiStatus['TIME-STBREVIN-CERTE'])
      },
      next: apiStatus.next_mode.map((element: ApiStatus) => {
        return {
          from: element.from.split(' ')[0],
          code: element.code_mode.toLowerCase(),
          label: element.lib_mode
        };
      })
    };
  }

  getColor(time: any) {
    time = parseInt(time, 10);
    return time >= 7 ? (time > 15 ? 'rouge' : 'orange')  : 'vert';
  }

  formatEvent(apiEvent: ApiEvent): Event {
    let icon: string;
    let label: string;
    let type: string;

    if (apiEvent.nature === 'Accident') {
      icon = 'accident';
      label = 'Accident';
      type = 'accident';
    } else if (apiEvent.nature === 'Vent'){
      icon = 'vent-fort';
      label = 'Vents violents';
      type = 'vent';
    }else if (apiEvent.nature === 'VL en panne'){
      icon = 'particulier';
      label = 'Véhicule en panne';
      type = 'panne';
    }

    return {
      type,
      label,
      icon,
      zone: ['a', 'b', 'c', 'd', 'e', 'nord', 'sud'][Math.round(Math.random() * 6)],
      status: apiEvent.statut,
      datePublication: apiEvent.datePublication,
      ligne1: apiEvent.ligne1,
      ligne2: apiEvent.ligne2,
      ligne3: apiEvent.ligne3,
      ligne4: apiEvent.ligne4,
      ligne5: apiEvent.ligne5,
      ligne6: apiEvent.ligne6
    };
  }
}
