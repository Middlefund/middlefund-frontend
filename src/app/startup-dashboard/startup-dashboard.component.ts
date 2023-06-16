import {Component, ElementRef, HostListener} from '@angular/core';
import {animate, state, style, transition, trigger, useAnimation} from "@angular/animations";
import {slideInLeft, slideInRight, bounce} from "ng-animate";

@Component({
  selector: 'app-startup-dashboard',
  templateUrl: './startup-dashboard.component.html',
  styleUrls: ['./startup-dashboard.component.css'],
})


export class StartupDashboardComponent {
  loading= true
  isProfileMenuOpen = false;
  isMobileMainMenuOpen = false
  isMobileSubMenuOpen = false
  slideIn: any = false
  navigationData = [
    {title: 'Dashboard', icon: 'home', route: '/startup/home'}
  ]


  constructor() {
  }

  openMobileSubMenu() {
    this.isMobileSubMenuOpen = !this.isMobileSubMenuOpen;
  }

  openMobileMainMenu() {
    this.isMobileMainMenuOpen = !this.isMobileMainMenuOpen
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const isClickedOutside = !(event.target as HTMLElement).closest('.profileMenu');
    const isProfileButton = !(event.target as HTMLElement).closest('.profileButton');
    if (isClickedOutside && isProfileButton) {
      this.isProfileMenuOpen = false;
    }
  }


      isNotificationsPanelOpen = false
      openNotificationsPanel() {
        this.slideIn = !this.slideIn
        this.isNotificationsPanelOpen = !this.isNotificationsPanelOpen;
      }




}
