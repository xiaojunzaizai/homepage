import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private token: string = '';

  constructor( private storageService: StorageService) { }

  generateToken(): string {
    this.token = uuidv4(); // 使用UUID生成一个token
    sessionStorage.setItem('signInToken', this.token); // 将token保存在sessionStorage中
    return this.token;
  }

  getToken(): string | null {
    return this.token || sessionStorage.getItem('signInToken');
  }

  clearToken():void{
    sessionStorage.clear();
  }

  clearSpecificToken(name:string):void{
    sessionStorage.removeItem(name);
  }

  isValidToken(tokenToCheck: string): boolean {
    return this.getToken() === tokenToCheck;
  }
}
