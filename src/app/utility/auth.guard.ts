import { ActivatedRouteSnapshot, CanActivateFn, provideRouter, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import {AccountsService} from "../accounts/accounts.service";

export const canActivateStartup: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const user = inject(AccountsService);
    if (user.loggedInUser && user.userData.user_type === 'startup') {
      return true;
    }
    inject(Router).navigateByUrl('/login').then(r => r)
    return false

  };

export const canActivateInvestor: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const user = inject(AccountsService);
    if (user.loggedInUser && user.userData.user_type === 'investor') {
      // authorised so return true
      return true;
    }
    inject(Router).navigateByUrl('/login').then(r => r)
    return false

  };

export const cannotAuthenticate: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const user = inject(AccountsService);
    if (user.loggedInUser && user.userData.user_type === 'startup') {
      inject(Router).navigateByUrl('/startup').then(r => r)
      return false;
    }
    else if (user.loggedInUser && user.userData.user_type === 'investor') {
      inject(Router).navigateByUrl('/investor').then(r => r)
      return false;
    }

    return true

  };
