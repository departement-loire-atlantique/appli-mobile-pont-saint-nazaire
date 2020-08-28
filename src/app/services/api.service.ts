import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import '@capacitor-community/http';
import { Plugins, FilesystemDirectory } from '@capacitor/core';
const { Http, Filesystem } = Plugins;

import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpNative: HTTP, private platform: Platform) {}

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
    if (this.platform.is('capacitor')) {
      const folder = await Filesystem.getUri({
        directory: FilesystemDirectory.Data,
        path: ''
      });

      const path = folder + '/webcam.jpg';
      await this.httpNative.downloadFile(environment.apiUrl + '/webcam?id=psn', null, null, path);
      const image = ( window as any).Ionic.WebView.convertFileSrc(path);
      return image + '?date=' + new Date().getTime();
    } else {
      let result = null;
      const ret = await Http.downloadFile({
        url: environment.apiUrl + '/webcam?id=psn',
        filePath: 'webcam.jpg',
        fileDirectory: FilesystemDirectory.Data
      });

      await new Promise((resolve, reject) => {
        if (ret.blob) {
          const reader = new FileReader();
          reader.onload = () => {
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
}
