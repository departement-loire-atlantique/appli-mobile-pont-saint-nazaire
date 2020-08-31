import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import '@capacitor-community/http';
import { Plugins, FilesystemDirectory } from '@capacitor/core';
const { Http, Filesystem } = Plugins;

import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from '@ionic/angular';
import { HttpDownloadFileResult } from '@capacitor-community/http';

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
    const download: HttpDownloadFileResult = await Http.downloadFile({
      url: environment.apiUrl + '/webcam?id=psn',
      filePath: 'webcam.jpg',
      fileDirectory: FilesystemDirectory.Data
    });

    // On a device the file will be written and will return a path
    if (download.path) {
      // This will return a base64 !
      const read = await Filesystem.readFile({
        path: 'webcam.jpg',
        directory: FilesystemDirectory.Data
      });

      return 'data:image/jpg;base64,' + read.data;
    }

    // On desktop the function will return a blob
    if (download.blob) {
      let result = null;

      await new Promise((resolve, reject) => {
        if (download.blob) {
          const reader = new FileReader();
          reader.onload = () => {
            result = reader.result;
            resolve();
          };
          reader.readAsDataURL(download.blob);
        } else {
          reject();
        }
      });
      return result;
    }

    return;
  }
}
