import {Component, ElementRef, HostListener} from '@angular/core';
import {animate, state, style, transition, trigger, useAnimation} from "@angular/animations";
import {slideInLeft, slideInRight, bounce} from "ng-animate";

@Component({
  selector: 'app-startup-dashboard',
  templateUrl: './startup-dashboard.component.html',
  styleUrls: ['./startup-dashboard.component.css'],
  animations: [
    trigger('slideIn', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(1000)
      ]),
      transition('* => void', [
        animate(1000, style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]

})


export class StartupDashboardComponent {
  slideIn: any;
  loading= true
  isProfileMenuOpen = false;
  isMobileMainMenuOpen = false
  isMobileSubMenuOpen = false


  constructor(private elementRef: ElementRef) {
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


  getYear() {
      const date = new Date()
      return date.getFullYear()
  }
    getTheme = () => {
      if (window.localStorage.getItem('dark')) {
        const dark = localStorage.getItem('dark')
        return JSON.parse(dark!)
      }

      return !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    }

  isDark = this.getTheme()

    setTheme = (value: string) => {
      window.localStorage.setItem('dark', value)
    }

    getColor = () => {
      if (window.localStorage.getItem('color')) {
        return window.localStorage.getItem('color')
      }
      return 'cyan'
    }

      toggleTheme() {
        this.isDark = !this.isDark
        this.setTheme(this.isDark)
      }
      setLightTheme() {
        this.isDark = false
        this.setTheme(this.isDark)
      }
      setDarkTheme() {
        this.isDark = true
        this.setTheme(this.isDark)
      }
      color = this.getColor()

     isSidebarOpen: boolean = false;

      isNotificationsPanelOpen = false
      openNotificationsPanel() {
        this.slideIn = !this.slideIn
        this.isNotificationsPanelOpen = !this.isNotificationsPanelOpen;
      }

      notificationType = 'user';

      toggleNotificationType(type: string) {
        this.notificationType = type;
      }


}
