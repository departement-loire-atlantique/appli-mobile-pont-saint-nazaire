import { Injectable } from '@angular/core';
import { AppState, Plugins } from '@capacitor/core';
import { Observable } from 'rxjs';

import { DECOUPAGE_ZONE, EVENTS_MOCK } from '../models/constantesCD44';
import { ApiEvent, Event } from '../models/event';
import { ApiStatus, Status } from '../models/status';

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
        // datePublication: new Date(),
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
    return events;
  }

  constructor() { }


  /**
   * Hook the appStateChange event
   */
  appStateChangeDetector() {
    return new Observable(observer => {
      App.addListener('appStateChange', (state: AppState) => {
        observer.next(state);
      });
    });
  }

  /**
   * Hook to the networkStatusChange event
   */
  networkChangeDetector() {
    return new Observable(observer => {
      Network.addListener('networkStatusChange', status => {
        observer.next(status);
      });
    });
  }

  /**
   * Formats the api response to a more readable object
   * @param apiStatus Response from the api /psnstatus
   */
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

  /**
   * Returns a color code for a given travel time
   * @param time travel time from on end of the bridge to the other
   */
  getColor(time: string) {
    const numberTime = parseInt(time, 10);
    return numberTime >= 7 ? (numberTime > 15 ? 'rouge' : 'orange') : 'vert';
  }

  /**
   * Formats the api events to a more readable object
   * @param apiEvents Events sent by the api
   */
  getEventsList(apiEvents?: ApiEvent[]): Event[] {
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
    } else if (apiEvent.nature === 'Vent') {
      icon = 'vent-fort';
      label = 'Vents violents';
      type = 'vent';
    } else if (apiEvent.nature === 'VL en panne') {
      icon = 'particulier';
      label = 'Véhicule en panne';
      type = 'panne';
    }

    const long = parseFloat(apiEvent.longitude);

    zone = long > DECOUPAGE_ZONE.LONGMAX_NORD ? 'nord' :
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
