import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { consoleLog } from '../util-tool/messageConsoleUtil';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const tokenService = inject(TokenService);
  const tokenFromRoute = route.queryParams['signInToken'];
  const token = sessionStorage.getItem('signInToken');
  if(token && tokenFromRoute &&tokenService.isValidToken(tokenFromRoute) && tokenFromRoute === token){
    consoleLog('authGuard', 'jump success');
    return true;
  }
  consoleLog('authGuard', 'jump failed');
  return false;
};

