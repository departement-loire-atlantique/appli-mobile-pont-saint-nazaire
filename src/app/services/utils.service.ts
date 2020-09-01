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
    return {
      code: apiStatus.code_current_mode.toLowerCase(),
      status: {
        north: this.getColor(apiStatus['TIME-CERTE-STBREVIN']),
        south: this.getColor(apiStatus['TIME-STBREVIN-CERTE'])
      },
      next: apiStatus.next_mode
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
