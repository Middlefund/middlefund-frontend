import {Component, ElementRef, HostListener} from '@angular/core';
import {animate, state, style, transition, trigger, useAnimation} from "@angular/animations";
import {slideInLeft, slideInRight, bounce} from "ng-animate";

@Component({
  selector: 'app-startup-dashboard',
  templateUrl: './startup-dashboard.component.html',
  styleUrls: ['./startup-dashboard.component.css'],
})


export class StartupDashboardComponent {
  isProfileMenuOpen = false;
  slideIn: any = false
  isNotificationsPanelOpen = false
  navigationData = [
    {title: 'Dashboard', icon: 'home', route: '/startup/home'},
    {title: 'View Investors', icon: 'view_comfy', route: '/startup/view-investors'},
    {title: 'Settings', icon: 'settings', route: '/startup/settings'}
  ]


  constructor() {
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const isClickedOutside = !(event.target as HTMLElement).closest('.profileMenu');
    const isProfileButton = !(event.target as HTMLElement).closest('.profileButton');
    if (isClickedOutside && isProfileButton) {
      this.isProfileMenuOpen = false;
    }
  }

  openNotificationsPanel() {
    this.slideIn = !this.slideIn
    this.isNotificationsPanelOpen = !this.isNotificationsPanelOpen;
  }

}
