import { Injectable } from '@angular/core';
import { Plugins, AppState } from '@capacitor/core';
import { Observable } from 'rxjs';
import { Status, ApiStatus } from '../models/status';
import { Event, ApiEvent } from '../models/event';
import { DECOUPAGE_ZONE, EVENTS_MOCK } from '../models/constantesCD44';

const { App, Network } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  generateRandomEvent(): Event[] {
    const events = [];
    const allEvents = [];

    const rand = Math.round(Math.random() * 12);

    for (let index = 0; index < rand; index++) {
      const apiEvent: ApiEvent = {
        nature: ['Accident', 'VL en panne', 'Vent'][Math.round(Math.random() * 2)],
        statut: ['en cours', 'prévisionnel'][Math.round(Math.random())],
        //datePublication: new Date(),
        ligne1: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, rem?',
        ligne2: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, rem?',
        ligne3: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, rem?',
        ligne4: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, rem?',
        ligne5: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, rem?',
        ligne6: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, rem?'
      };
      const event = this.formatEvent(apiEvent);
      allEvents.push(event);
    }

    allEvents.forEach(event => {
      const exists = events.findIndex(item => {
        if (event.type === 'vent') {
          return item.type === 'vent';
        } else {
          return item.zone === event.zone;
        }
      }) !== -1;

      if (!exists) {
        events.push(event);
      }
    });
    console.log('events ', events)
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

  networkChangeDetector() {
    return new Observable(observer => {
      Network.addListener('networkStatusChange', status => {
        observer.next(status);
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

  getEventsList(apiEvents?: ApiEvent[]): Event[]{
    // TODO : Remplacer EVENT_MOCK par apiEvents
    return EVENTS_MOCK.map(event => {
      return this.formatEvent(event);
    });
  }

  formatEvent(apiEvent: ApiEvent): Event {
    let icon: string;
    let label: string;
    let type: string;
    let zone: string;
    let datePublication: Date;

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

    const long = parseFloat(apiEvent.longitude);

    zone =  long > DECOUPAGE_ZONE.LONGMAX_NORD ? 'nord' :
            long < DECOUPAGE_ZONE.LONGMAX_NORD && long >= DECOUPAGE_ZONE.LONGMAX_A ? 'a' :
            long < DECOUPAGE_ZONE.LONGMAX_A && long >= DECOUPAGE_ZONE.LONGMAX_B ? 'b' :
            long < DECOUPAGE_ZONE.LONGMAX_B && long >= DECOUPAGE_ZONE.LONGMAX_C ? 'c' :
            long < DECOUPAGE_ZONE.LONGMAX_C && long >= DECOUPAGE_ZONE.LONGMAX_D ? 'd' :
            long < DECOUPAGE_ZONE.LONGMAX_D && long >= DECOUPAGE_ZONE.LONGMAX_E ? 'e' :
            long < DECOUPAGE_ZONE.LONGMAX_E ? 'sud' : 'nord';


    datePublication = new Date(apiEvent.datePublication.toString().split(' ')[0]);
    // datePublication = new Date('2013-12-06T16:45:11 +0200'.split(' ')[0]);
    return {
      type,
      label,
      icon,
      zone,
      datePublication,
      status: apiEvent.statut,
      ligne1: apiEvent.ligne1,
      ligne2: apiEvent.ligne2,
      ligne3: apiEvent.ligne3,
      ligne4: apiEvent.ligne4,
      ligne5: apiEvent.ligne5,
      ligne6: apiEvent.ligne6
    };
  }
}
