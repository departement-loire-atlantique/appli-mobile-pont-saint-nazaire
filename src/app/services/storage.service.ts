import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async get(key: string): Promise<any> {
    const stored = await Storage.get({ key });
    return JSON.parse(stored.value);
  }

  async set(key: string, value: any): Promise<any> {
    value = JSON.stringify(value);
    return await Storage.set({ key, value });
  }

  async remove(key: string): Promise<any> {
    return await Storage.remove({ key });
  }

  async getKeys(): Promise<string[]> {
    const { keys } = await Storage.keys();
    return keys;
  }

  async clear(): Promise<any> {
    await Storage.clear();
  }
}
