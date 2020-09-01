import { Injectable } from '@angular/core';
import { Plugins, AppState } from '@capacitor/core';
import { Observable } from 'rxjs';
import { Status, ApiStatus } from '../models/status';

const { App } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  generateRandomEvent(): any {
    const events = [];
    const rand = Math.round(Math.random() * 6);

    for (let index = 0; index < rand; index++) {
      events.push({
        type: ['accident', 'panne', 'deviation'][Math.round(Math.random() * 2)],
        zone: ['a', 'b', 'c', 'd', 'e', 'nord', 'sud'][Math.round(Math.random() * 6)]
      });
    }

    if (Math.round(Math.random())) {
      events.push({
        type: 'vent'
      });
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

  formatPertubation(eventsList: any){
    const eventListMap =  eventsList.map(p => {
      p.infosPertubation = this.getNameSvg(p.nature)
      return p; 
   })
   console.log('eventListMap', eventListMap);  
   return eventListMap;
  }

  getNameSvg(nature){
    let imgSvg = ''
    let libellePertubation = ''
    let typePertubation = ''
    if (nature == 'Accident') {
      imgSvg = 'accident'
      libellePertubation = 'Accident'
      typePertubation = 'accident'
    } else if(nature == 'Vent'){
      imgSvg ='vent-fort'
      libellePertubation = 'Vents violents'
      typePertubation = 'vent'
    }else if(nature == 'VL en panne'){
      imgSvg = 'particulier'
      libellePertubation = 'Véhicule en panne'
      typePertubation = 'panne'
    }
    return {
      imgSvg,
      libellePertubation,
      typePertubation
    }
  }
}
