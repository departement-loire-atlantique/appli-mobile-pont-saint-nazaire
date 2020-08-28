import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { File } from '@ionic-native/file/ngx';

import '@capacitor-community/http';
import { Plugins, FilesystemDirectory } from '@capacitor/core';
const { Http } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() {}

  async getPSNStatus() {
    const response = await Http.request({
      method: 'GET',
      url: environment.apiUrl + '/psnstatus',
      params: {
        mode: 'no-cors'
      }
    });

    return response.data;
  }

  async getEvents() {
    const response = await Http.request({
      method: 'GET',
      url: environment.apiUrl + '/traficevents?filter=Pont%20de%20Saint-Nazaire',
      params: {
        mode: 'no-cors'
      }
    });

    return response.data;
  }

  async getEvent(id: number) {
    const response = await Http.request({
      method: 'GET',
      url: environment.apiUrl + '/event/' + id,
      params: {
        mode: 'no-cors'
      }
    });

    return response.data;
  }

  async getLatestWebcam() {
    let result = null;
    const ret = await Http.downloadFile({
      url: environment.apiUrl + '/webcam?id=psn',
      filePath: 'webcam.jpg',
      fileDirectory: FilesystemDirectory.Data
    });

    await new Promise((resolve, reject) => {
      console.log(ret);

      if (ret.blob) {
        const reader = new FileReader();
        console.log(reader);

        reader.onload = () => {
          console.log(reader);

          result = reader.result;
          resolve();
        };
        reader.readAsDataURL(ret.blob);
      } else {
        reject();
      }
    });
    return result;
  }

}
