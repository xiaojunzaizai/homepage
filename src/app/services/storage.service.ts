import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setSessionItem(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getSessionItem(key: string) {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  clearSession() {
    sessionStorage.clear();
  }

  setLocalFlag(key: string) {
    localStorage.setItem(key, 'true');
  }

  getLocalFlag(key: string): boolean {
    return localStorage.getItem(key) === 'true';
  }

  clearLocalFlag(key: string) {
    localStorage.removeItem(key);
  }
}
