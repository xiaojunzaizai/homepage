import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private token: string = '';

  constructor() { }

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

  isValidToken(tokenToCheck: string): boolean {
    return this.getToken() === tokenToCheck;
  }
}
