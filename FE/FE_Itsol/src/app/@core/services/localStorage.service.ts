import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
}) export  class  LocalStorageService{
  setItem(key: string , value: any){
    localStorage.setItem(key , JSON.stringify(value));
  }

  getItem(key: string): any{
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  }

  removeItem(key: string){
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}
