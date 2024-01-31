// data-cache.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataCacheService {
  private dataCache: any = {};

  constructor() {}

  setData(key: string, value: any) {
    this.dataCache[key] = value;
  }

  getData(key: string) {
    return this.dataCache[key];
  }
}