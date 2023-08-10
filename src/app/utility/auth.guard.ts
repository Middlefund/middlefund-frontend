import { ActivatedRouteSnapshot, CanActivateFn, provideRouter, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import {AccountsService} from "../accounts/accounts.service";
import {PitchSubmissionService} from "../pitch-submission/pitch-submission.service";
import {ToastrService} from "ngx-toastr";


export const canActivate: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const user = inject(AccountsService);
    if (user.loggedInUser) {
      return true;
    }
    inject(Router).navigateByUrl('/login').then(r => r)
    return false

  };
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

export const canActivateAdmin: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const user = inject(AccountsService);
    if (user.loggedInUser && user.userData.user_type === 'admin') {
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
    else if(user.loggedInUser && user.userData.user_type === 'admin') {
      inject(Router).navigateByUrl('/admin').then(r => r)
      return false;
    }

    return true

  };

export const canActivatePitchDetails: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const pitch = inject(PitchSubmissionService);
    if (pitch.pitchData && pitch.startupProfileValid) {
      return true
    }
    inject(ToastrService).info('Please fill out the previous steps')
    inject(Router).navigateByUrl('/pitch-submission/startup-profile').then(r => r)
    return false;

  };
export const canActivateRepDetails: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const pitch = inject(PitchSubmissionService);
    if (pitch.pitchData && pitch.pitchDetailsValid) {
      return true
    }
    inject(ToastrService).info('Please fill out the previous steps')
    inject(Router).navigateByUrl('/pitch-submission/pitch-details').then(r => r)
    return false;
  };

export const canActivateSupportingDocs: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const pitch = inject(PitchSubmissionService);
    if (pitch.pitchData && pitch.repDetailsValid) {
      return true
    }
    inject(ToastrService).info('Please fill out the previous steps')
    inject(Router).navigateByUrl('/pitch-submission/representative-details').then(r => r)
    return false;

  };
