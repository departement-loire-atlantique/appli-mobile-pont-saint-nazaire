import { Injectable, NgZone } from '@angular/core';
import { AppState, Plugins } from '@capacitor/core';
import { Observable } from 'rxjs';

import { DECOUPAGE_ZONE, EVENTS_MOCK } from '../models/constantesCD44';
import { ApiEvent, Event } from '../models/event';
import { ApiStatus, Status, UtilDate } from '../models/status';

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

  constructor(private zone: NgZone) { }


  /**
   * Hook the appStateChange event
   */
  appStateChangeDetector() {
    return new Observable(observer => {
      App.addListener('appStateChange', (state: AppState) => {
        this.zone.run(() => {
          observer.next(state);
        });
      });
    });
  }

  /**
   * Hook to the networkStatusChange event
   */
  networkChangeDetector() {
    return new Observable(observer => {
      Network.addListener('networkStatusChange', status => {
        this.zone.run(() => {
          observer.next(status);
        });
      });
    });
  }

  isParticular(apiStatus: ApiStatus) {
    return apiStatus.code_current_mode === 'MODE_PARTICULIER';
  }

  /**
   * Formats the api response to a more readable object
   * @param apiStatus Response from the api /psnstatus
   */
  formatStatus(apiStatus: ApiStatus): Status {
    const isParticular = this.isParticular(apiStatus);

    return {
      code: isParticular ? 'mode-particulier' : apiStatus.code_current_mode.toLowerCase(),
      label: apiStatus.lib_current_mode,
      labelFermeture: (apiStatus?.close_from && apiStatus?.closed_to) ? this.getLabelFermeture(apiStatus.close_from, apiStatus.closed_to)
        : '',
      colorStatus: {
        north: isParticular ? 'particulier' : this.getColor(apiStatus['TIME-CERTE-STBREVIN']),
        south: isParticular ? 'particulier' : this.getColor(apiStatus['TIME-STBREVIN-CERTE'])
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
   * Returns Date Object
   * @param date Date string to transform to Date
   * @param separator Separator to catch date
   */
  getDateOject(date: any, separator: string): Date {
    return new Date(date.toString().split(separator)[0]);
  }

  /**
   * Returns UtilDate format for closing
   * @param someDate format date for closing
   */
  getFermetureDate(someDate: string): UtilDate {
    const date = this.getDateOject(someDate, ' ');
    const dateCompare = this.getDateOject(someDate, 'T');
    return {
      dateFormat: date.toLocaleDateString(),
      timeFormat: date.toLocaleTimeString('fr-FR', { hour: 'numeric', minute: 'numeric' }),
      dateToCompare: dateCompare.getTime()
    };
  }

  /**
   * Return label of closing
   * @param closeFrom Closing start date
   * @param closeTo Closing end date
   */
  getLabelFermeture(closeFrom: string, closeTo: string): string {
    let closeFromFormat: UtilDate;
    let closeToFormat: UtilDate;

    closeFromFormat = this.getFermetureDate(closeFrom);
    closeToFormat = this.getFermetureDate(closeTo);

    if (closeFromFormat.dateToCompare < closeToFormat.dateToCompare) {
      return `Du ${closeFromFormat.dateFormat} - ${closeFromFormat.timeFormat} au ${closeToFormat.dateFormat} - ${closeToFormat.timeFormat}`;
    }
    if (closeFromFormat.dateToCompare === closeToFormat.dateToCompare) {
      return `Le ${closeFromFormat.dateFormat}, de ${closeFromFormat.timeFormat} à ${closeToFormat.timeFormat}`;
    }
  }

  /**
   * Formats the api events to a more readable object
   * @param apiEvents Events sent by the api
   */
  getEventsList(apiEvents?: ApiEvent[]): Event[] {
    return apiEvents.map(event => {
      return this.formatEvent(event);
    });
  }

  formatEvent(apiEvent: ApiEvent): Event {
    let icon: string;
    let label: string;
    let type: string;
    let zone = 'nord';
    let datePublication: Date;

    if (apiEvent.nature === 'Accident') {
      icon = 'accident';
      label = 'Accident';
      type = 'accident';
    } else if (apiEvent.nature === 'Vent') {
      icon = 'vent-fort';
      label = 'Vents violents';
      type = 'vent';
      zone = 'vent';
    } else if (apiEvent.nature === 'VL en panne') {
      icon = 'mode-particulier';
      label = 'Véhicule en panne';
      type = 'panne';
    } else if (apiEvent.nature === 'Deviation') {
      icon = 'deviation';
      label = 'Déviation';
      type = 'deviation';
    }

    const long = parseFloat(apiEvent.longitude);

    if (type !== 'vent') {
      DECOUPAGE_ZONE.forEach((item) => {
        if (long <= item.value) {
          zone = item.name;
        }
      });
    }

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

  isDeviation(status: Status) {
    return status.code === 'm120' || status.code === 'm012';
  }

  getEventDeviation(status): Event{
    return {
      datePublication: new Date(),
      icon: 'deviation',
      label: 'Déviation',
      type: 'deviation',
      zone: status.code == 'm012' ? 'nord-ouest' : 'sud-est',
      status: 'en cours',
      ligne1: 'Route fermée / déviation'
    }
  }
}
