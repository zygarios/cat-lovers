import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';

export const guardHook = (shouldBeLoggedIn: boolean, urlToRedirect: string) => {
  const userAuthService = inject(UserAuthService);
  const isUserLoggedIn = userAuthService.isLoggedIn();
  if (
    (shouldBeLoggedIn && isUserLoggedIn) ||
    (!shouldBeLoggedIn && !isUserLoggedIn)
  ) {
    return true;
  }
  inject(Router).navigate([urlToRedirect]);
  return false;
};
