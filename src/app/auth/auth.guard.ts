import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { consoleLog } from '../util-tool/messageConsoleUtil';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const tokenFromRoute = route.queryParams['signInToken'];
  console.log(tokenFromRoute);
  const token = sessionStorage.getItem('signInToken');
  console.log(token);

  if(token){
    consoleLog('authGuard', 'jump success');
    return true;
  }
  consoleLog('authGuard', 'jump failed');
  router.navigate(['/home'])
  return false;
};

